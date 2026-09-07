import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TodoStatus } from '../models/todo-status.enum';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // methods to be implemented

  private todos: Todo[] = [];

  getTask() {}

  addTask(title: string, description: string, status: TodoStatus) {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: title,
      description: description,
      status: status,
      createdAt: new Date(),
    };

    this.todos.push(newTodo);
    console.log(this.todos);
  }

  updateTask() {}

  deleteTask() {}
}
