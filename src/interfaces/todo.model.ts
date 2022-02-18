export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface UserTodos {
  [todoId: string]: Todo;
}

export interface Todos {
  [userId: string]: UserTodos;
}

export interface TodoState {
  todos: Todos;
  loading: boolean;
  error: string;
}
