export interface User {
  id: string;
  name: string;
  email: string;
  website: string;
}

export interface Users {
  [name: string]: User;
}

export interface UserState {
  users: Users;
  loading: boolean;
  error: string;
}
