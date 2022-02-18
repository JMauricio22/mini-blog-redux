import { GET_ALL, LOADING, ERROR } from "../types/usersTypes";
import { UserState } from "../interfaces/user.model";
import { AnyAction } from "redux";

const INITIAL_STATE: UserState = {
  users: {},
  loading: false,
  error: "",
};

const usersReducer = (state: UserState = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case GET_ALL:
      return { ...state, users: action.payload, loading: false };
    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default usersReducer;
