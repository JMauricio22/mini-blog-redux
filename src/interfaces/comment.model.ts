export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface PostComments {
  [postId: string]: Comment[];
}
export interface PostCommentsLoading {
  [postId: string]: boolean;
}
export interface PostCommentsError {
  [postId: string]: string;
}

export interface CommentState {
  comments: PostComments;
  comments_loading: PostCommentsLoading;
  comments_error: PostCommentsError;
}
