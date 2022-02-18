import axios, { AxiosResponse } from "axios";
import { LOADING, ERROR, GET_POSTS } from "../types/postsTypes";
import { PostState, Posts, Post } from "../interfaces/post.model";
import { Dispatch } from "redux";
import { GetState } from "./types";

export const getPostsByUserId =
  (id: string) => async (dispatch: Dispatch, getState: GetState) => {
    try {
      dispatch({
        type: LOADING,
      });
      const { data }: AxiosResponse<Post[]> = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${id}`
      );
      const { posts }: PostState = getState().postsReducer;
      const newPosts: Posts = {
        ...posts,
      };
      newPosts[id] = data.map((item: Post) => {
        return {
          ...item,
          open: false,
        };
      });
      dispatch({
        type: GET_POSTS,
        payload: newPosts,
      });
    } catch (error: any) {
      console.log("Error:", error.message);
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };

export const togglePostComments =
  (userIndex: number, postIndex: number) =>
  (dispatch: Dispatch, getState: GetState) => {
    try {
      const { posts }: PostState = getState().postsReducer;
      const newPosts: Posts = {
        ...posts,
      };
      let post = newPosts[userIndex][postIndex];
      newPosts[userIndex][postIndex] = {
        ...post,
        open: !post.open,
      };
      dispatch({
        type: GET_POSTS,
        payload: newPosts,
      });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
