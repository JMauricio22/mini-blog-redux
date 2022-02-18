import { GET_ALL, LOADING, ERROR, UPDATE_TODOS } from "../types/todosTypes";
import { TodoState } from "../interfaces/todo.model";
import { AnyAction } from "redux";

const INITIAL_STATE: TodoState = {
  todos: {},
  loading: false,
  error: "",
};

const usersReducer = (state: TodoState = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case GET_ALL:
    case UPDATE_TODOS:
      return { ...state, todos: action.payload, loading: false };
    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default usersReducer;
