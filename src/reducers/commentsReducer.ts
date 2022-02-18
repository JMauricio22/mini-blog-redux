import {
  UPDATE_COMMENTS,
  UPDATE_COMMENTS_LOADING,
  UPDATE_COMMENTS_ERROR,
  CLEAR_ALL_COMMENTS_ERROR,
} from "../types/commentsTypes";
import { CommentState } from "../interfaces/comment.model";
import { AnyAction } from "redux";

const INITIAL_STATE: CommentState = {
  comments: {},
  comments_loading: {},
  comments_error: {},
};

const commentsReducer = (
  state: CommentState = INITIAL_STATE,
  action: AnyAction
) => {
  switch (action.type) {
    case UPDATE_COMMENTS:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.postId]: action.payload.comments,
        },
      };
    case UPDATE_COMMENTS_LOADING:
      return {
        ...state,
        comments_loading: {
          ...state.comments_loading,
          [action.payload.postId]: action.payload.isLoading,
        },
      };
    case UPDATE_COMMENTS_ERROR:
      return {
        ...state,
        comments_error: {
          ...state.comments_error,
          [action.payload.postId]: action.payload.errorMessage,
        },
      };
    case CLEAR_ALL_COMMENTS_ERROR:
      return {
        ...state,
        comments_error: {},
      };
    default:
      return state;
  }
};

export default commentsReducer;
