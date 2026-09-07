import { Component } from '@angular/core';
import { Todo } from '../../../models/todo.model';
import { TodoService } from '../../../services/todo.service';
import { TodoItem } from '../todo-item/todo-item';
import { Router } from '@angular/router';
import { TodoStatus } from '../../../models/todo-status.enum';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItem],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  todos: Todo[] = [];

  constructor(
    private readonly todoService: TodoService,
    private readonly router: Router,
  ) {
    this.todos = this.todoService.getTasks();
  }

  onAddNewTask() {
    this.router.navigate(['/todos/new']);
  }

  onEdit(task: Todo) {
    this.router.navigate(['/todos', task.id, 'edit']);
  }

  onDelete(todoId: string) {
    this.todoService.deleteTask(todoId);
    this.todos = this.todoService.getTasks();
  }

  onComplete(todo: Todo) {
    const updatedTodo: Todo = {
      ...todo,
      status: TodoStatus.Completed,
    };

    this.todoService.updateTask(updatedTodo);
    this.todos = this.todoService.getTasks();
  }
}
