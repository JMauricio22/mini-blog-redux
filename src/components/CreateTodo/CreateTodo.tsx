import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Todos } from "../../interfaces/todo.model";
import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";
import { State } from "../../actions/types";
import "../../css/CreateTodo.scss";
import FormTodo from "./FormTodo";

interface CreateTodoProps {
  todos: Todos;
}

interface TodoFormParams {
  userId?: string;
  todoId?: string;
}

const CreateTodo = ({ todos }: CreateTodoProps) => {
  const [form, setForm] = useState({
    userId: "",
    title: "",
  });
  const { userId, todoId } = useParams<TodoFormParams>();
  const [isEdit] = useState(userId && todoId ? true : false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (userId && todoId) {
      const todo = todos[userId][todoId];
      console.log("todo", todo);
      setForm({
        userId: todo.userId.toString(),
        title: todo.title,
      });
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const onChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const isValid = (): boolean => {
    if (form.userId && form.title) {
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    try {
      setLoading(true);

      if (isEdit) {
        await axios.put(
          `https://jsonplaceholder.typicode.com/todos/${todoId}`,
          {
            ...form,
          }
        );
      } else {
        await axios.post("https://jsonplaceholder.typicode.com/todos", {
          ...form,
          completed: false,
        });
      }
      history.replace("/todos");
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const onLoading = () => {
    return loading ? <Spinner /> : null;
  };

  const onError = () => {
    return error && !loading ? <Error message={error} /> : null;
  };

  const onRender = () => {
    return !loading && !error ? (
      <FormTodo
        isEdit={isEdit}
        onChangeForm={onChangeForm}
        isValid={isValid}
        onSubmit={onSubmit}
        form={form}
      />
    ) : null;
  };

  return (
    <>
      {onLoading()}
      {onRender()}
      {onError()}
    </>
  );
};

const mapStateToProps = ({ usersReducer, todosReducer }: State) => ({
  todos: todosReducer.todos,
});

export default connect(mapStateToProps)(CreateTodo);
