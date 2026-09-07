import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TodoStatus } from '../models/todo-status.enum';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // methods to be implemented

  private todos: Todo[] = [];
  private todoStorageKey = 'todos_store';

  constructor() {
    this.loadTasksFromStorage();
  }

  getTasks(): Todo[] {
    return this.todos;
  }

  getTaskById(id: string): Todo | undefined {
    return this.todos.find((task) => task.id === id);
  }

  addTask(title: string, description: string, status: TodoStatus) {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: title,
      description: description,
      status: status,
      createdAt: new Date(),
    };

    this.todos.push(newTodo);
    this.saveTasksToStorage();
    // console.log(this.todos);
  }

  updateTask(updatedTodo: Todo) {
    const existingTodoIndex = this.todos.findIndex((todo) => todo.id === updatedTodo.id);

    if (existingTodoIndex == -1) {
      return;
    }

    this.todos[existingTodoIndex] = updatedTodo;

    this.saveTasksToStorage();
  }

  deleteTask(todoId: string) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
    this.saveTasksToStorage();
  }

  saveTasksToStorage() {
    localStorage.setItem(this.todoStorageKey, JSON.stringify(this.todos));
  }

  loadTasksFromStorage() {
    const localTasks = localStorage.getItem(this.todoStorageKey);
    if (!localTasks) {
      return;
    }
    try {
      this.todos = JSON.parse(localTasks) as Todo[];
    } catch {
      this.todos = [];
    }
  }
}
