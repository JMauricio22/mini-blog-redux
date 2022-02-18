import axios, { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import {
  UPDATE_COMMENTS,
  UPDATE_COMMENTS_LOADING,
  UPDATE_COMMENTS_ERROR,
  CLEAR_ALL_COMMENTS_ERROR,
} from "../types/commentsTypes";
import { CommentState } from "../interfaces/comment.model";
import { GetState } from "./types";

export const toggleLoading = (
  postId: number,
  dispatch: Dispatch,
  isLoading: boolean
) => {
  dispatch({
    type: UPDATE_COMMENTS_LOADING,
    payload: {
      postId,
      isLoading,
    },
  });
};

export const changeErrorState = (
  postId: number,
  dispatch: Dispatch,
  errorMessage: string
) => {
  dispatch({
    type: UPDATE_COMMENTS_ERROR,
    payload: {
      postId,
      errorMessage,
    },
  });
};

export const getComments =
  (postId: number) => async (dispatch: Dispatch, getState: GetState) => {
    const { comments }: CommentState = getState().commentsReducer;

    if (comments[postId]?.length) {
      return;
    }
    try {
      toggleLoading(postId, dispatch, true);
      const { data }: AxiosResponse<Comment[]> = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      );
      dispatch({
        type: UPDATE_COMMENTS,
        payload: {
          postId,
          comments: data,
        },
      });
    } catch (error: any) {
      console.log(error);
      changeErrorState(postId, dispatch, error.message);
    } finally {
      toggleLoading(postId, dispatch, false);
    }
  };

export const clearPostCommentsError = () => (dispatch: Dispatch) => {
  dispatch({
    type: CLEAR_ALL_COMMENTS_ERROR,
  });
};
