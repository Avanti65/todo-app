import { Routes } from '@angular/router';
import { TodoItem } from './features/todo/todo-item/todo-item';
import { TodoForm } from './features/todo/todo-form/todo-form';
import { TodoList } from './features/todo/todo-list/todo-list';

export const routes: Routes = [
  {
    path: '',
    component: TodoList,
  },
  {
    path: 'new',
    component: TodoForm,
  },
];
