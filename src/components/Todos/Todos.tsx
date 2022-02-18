import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import * as todosActions from "../../actions/todosActions";
import { State } from "../../actions/types";
import { Todos as TodosType } from "../../interfaces/todo.model";
import TodoList from "./TodoList";

interface TodosProps {
  todos: TodosType;
  isLoading: boolean;
  error: string;
  getAll(): void;
}

const Todos = ({ todos, getAll, isLoading, error }: TodosProps) => {
  useEffect(() => {
    const fetchTodos = () => {
      if (Object.keys(todos).length === 0) {
        getAll();
      }
    };
    fetchTodos();
  }, []);

  const onLoading = () => {
    return isLoading ? <Spinner /> : null;
  };

  const onError = () => {
    return !isLoading && error ? <Error message={error} /> : null;
  };

  const onRender = () => {
    return !isLoading && !error ? <TodoList /> : null;
  };

  return (
    <div>
      {onLoading()}
      {onError()}
      {onRender()}
    </div>
  );
};

const mapStateToProps = ({ todosReducer }: State) => ({
  todos: todosReducer.todos,
  isLoading: todosReducer.loading,
  error: todosReducer.error,
});

export default connect(mapStateToProps, todosActions)(Todos);
