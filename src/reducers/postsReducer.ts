import { GET_POSTS, LOADING, ERROR } from "../types/postsTypes";
import { AnyAction } from "redux";
import { PostState } from "../interfaces/post.model";

const INITIAL_STATE: PostState = {
  posts: {},
  loading: false,
  error: "",
};

const postsReducer = (state: PostState = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, posts: action.payload, loading: false };
    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default postsReducer;
