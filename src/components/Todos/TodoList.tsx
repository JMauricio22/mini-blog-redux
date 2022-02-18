import React from "react";
import { connect } from "react-redux";
import { Header, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {
  Todos as TodosType,
  Todo as TodoType,
} from "../../interfaces/todo.model";
import { Users } from "../../interfaces/user.model";
import Todo from "./Todo";
import { State } from "../../actions/types";

interface TodoListProps {
  todos: TodosType;
  users: Users;
}

interface UserTodosListProps {
  userName: string;
  usersTodos: TodoType[];
  userId: string;
}
interface UserTodoProps {
  todo: TodoType;
  userId: string;
}

const UserTodo = ({ todo, userId }: UserTodoProps) => (
  <Todo todo={todo} userId={userId} />
);

const UserTodosList = ({
  usersTodos,
  userName,
  userId,
}: UserTodosListProps) => (
  <>
    <Header as='h2' textAlign='center'>
      <u>{userName}</u>
    </Header>
    {usersTodos.map((todo) => (
      <UserTodo key={todo.id} todo={todo} userId={userId} />
    ))}
  </>
);

const TodoList = ({ todos, users }: TodoListProps) => {
  return (
    <>
      <Link to='/todos/create'>
        <Button icon color='facebook'>
          <Icon name='add' />
          ADD TODO
        </Button>
      </Link>
      {Object.keys(todos).map((userId) =>
        todos[userId] ? (
          <UserTodosList
            key={userId}
            userName={users[userId].name}
            usersTodos={Object.values(todos[userId])}
            userId={userId}
          />
        ) : null
      )}
    </>
  );
};

const mapStateToProps = ({ todosReducer, usersReducer }: State) => ({
  todos: todosReducer.todos,
  users: usersReducer.users,
});

export default connect(mapStateToProps)(TodoList);
