import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Checkbox, Segment, Button, Icon, Popup } from "semantic-ui-react";
import axios from "axios";
import { Todo as TodoType } from "../../interfaces/todo.model";
import * as todosActions from "../../actions/todosActions";
import clsx from "clsx";
import "../../css/Todo.scss";

interface TodoProps {
  todo: TodoType;
  userId: string;
  updateTodo(userId: number, todoId: number): void;
  getAll(): void;
}

const Todo = ({ todo, userId, updateTodo, getAll }: TodoProps) => {
  const history = useHistory();

  const handleChangeTodo = () => {
    updateTodo(Number.parseInt(userId), todo.id);
  };

  const deleteTodo = async () => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`
      );
      getAll();
    } catch (error) {
      console.log(error);
    }
  };

  const goToEditTodo = (todoId: number) => {
    history.push(`/todos/${userId}/${todoId}`);
  };

  return (
    <Segment className='todo' raised size='big'>
      <div className='left'>
        <Checkbox
          checked={todo.completed || false}
          onChange={handleChangeTodo}
        />
        <Popup
          content={todo.title}
          trigger={
            <span
              className={clsx({
                "line-through": todo.completed,
                "text-truncate": true,
              })}
            >
              {todo.title}
            </span>
          }
        />

        {todo.completed && <Icon name='check' size='small' color='green' />}
      </div>
      <div className='right'>
        <Button
          size='tiny'
          icon='edit'
          circular
          color='blue'
          onClick={() => goToEditTodo(todo.id)}
        />
        <Button
          size='tiny'
          icon='trash'
          circular
          color='red'
          onClick={deleteTodo}
        />
      </div>
    </Segment>
  );
};

export default connect(null, todosActions)(Todo);
