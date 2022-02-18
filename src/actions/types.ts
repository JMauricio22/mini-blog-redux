import { PostState } from "../interfaces/post.model";
import { UserState } from "../interfaces/user.model";
import { CommentState } from "../interfaces/comment.model";
import { TodoState } from "../interfaces/todo.model";

export interface State {
  postsReducer: PostState;
  usersReducer: UserState;
  commentsReducer: CommentState;
  todosReducer: TodoState;
}

export interface GetState {
  (): State;
}
