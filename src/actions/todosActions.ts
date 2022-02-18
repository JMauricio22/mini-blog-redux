import axios, { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { GET_ALL, LOADING, ERROR, UPDATE_TODOS } from "../types/todosTypes";
import { GET_ALL as GET_ALL_USERS } from "../types/usersTypes";
import { Todo, Todos } from "../interfaces/todo.model";
import { GetState } from "../actions/types";
import { User, Users } from "../interfaces/user.model";

export const getAll = () => async (dispatch: Dispatch, getState: GetState) => {
  try {
    dispatch({
      type: LOADING,
    });

    const { users } = getState().usersReducer;
    let hasUsers = Object.keys(users).length > 0;
    let getUsersPromise: Promise<any> = !hasUsers
      ? axios.get("https://jsonplaceholder.typicode.com/users")
      : Promise.resolve();

    const getTodosPromise: Promise<any> = axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    const [usersResponse, todosResponse]: [
      AxiosResponse<User[]>,
      AxiosResponse<Todo[]>
    ] = await Promise.all([getUsersPromise, getTodosPromise]);

    if (!hasUsers) {
      const newUsers = usersResponse.data.reduce((obj: Users, user: User) => {
        obj[user.id] = user;
        return obj;
      }, {});

      dispatch({
        type: GET_ALL_USERS,
        payload: newUsers,
      });
    }

    const newTodos: Todos = todosResponse.data.reduce(
      (obj: Todos, todo: Todo) => {
        obj[todo.userId] = {
          ...obj[todo.userId],
          [todo.id]: {
            ...todo,
          },
        };

        return obj;
      },
      {}
    );

    dispatch({
      type: GET_ALL,
      payload: newTodos,
    });
  } catch (error: any) {
    console.log("Error:", error.message);
    dispatch({
      type: ERROR,
      payload: error.message,
    });
  }
};

export const updateTodo =
  (userId: number, todoId: number) =>
  async (dispatch: Dispatch, getState: GetState) => {
    const { todos } = getState().todosReducer;
    let newTodos: Todos = {
      ...todos,
      [userId]: {
        ...todos[userId],
        [todoId]: {
          ...todos[userId][todoId],
          completed: !todos[userId][todoId].completed,
        },
      },
    };

    dispatch({
      type: UPDATE_TODOS,
      payload: newTodos,
    });
  };
