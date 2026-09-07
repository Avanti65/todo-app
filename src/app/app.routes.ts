import { Routes } from '@angular/router';
import { TodoItem } from './features/todo/todo-item/todo-item';
import { TodoForm } from './features/todo/todo-form/todo-form';

export const routes: Routes = [
  {
    path: '',
    component: TodoItem,
  },
  {
    path: 'new',
    component: TodoForm,
  },
];
