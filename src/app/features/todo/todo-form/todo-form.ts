import { Component } from '@angular/core';
import { TodoStatus } from '../../../models/todo-status.enum';

@Component({
  selector: 'app-todo-form',
  imports: [],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {
  readonly todoStatuses = Object.values(TodoStatus);
}
