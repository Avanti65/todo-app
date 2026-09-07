import { TodoStatus } from './todo-status.enum';

export interface Todo {
  id: string; // unique UUID string
  title: string;
  description: string;
  status: TodoStatus;
  createdAt: Date;
}
