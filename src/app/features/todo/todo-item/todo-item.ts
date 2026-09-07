import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoStatus } from '../../../models/todo-status.enum';
import { Todo } from '../../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css',
})
export class TodoItem {
  @Input() todo!: Todo;
  @Output() edit = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<string>(); //id of todo

  readonly todoStatuses = Object.values(TodoStatus);

  onEdit() {
    this.edit.emit(this.todo);
  }

  onDelete() {
    this.delete.emit(this.todo.id);
  }
}
