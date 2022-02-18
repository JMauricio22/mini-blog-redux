export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  open: boolean;
}

export interface Posts {
  [name: string]: Post[];
}

export interface PostState {
  posts: Posts;
  loading: boolean;
  error: string;
}
