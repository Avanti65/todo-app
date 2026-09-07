import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoStatus } from '../../../models/todo-status.enum';
import { Todo } from '../../../models/todo.model';
import { TodoStatusDirective } from '../../../directives/todo-status.directive';

@Component({
  selector: 'app-todo-item',
  imports: [TodoStatusDirective],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css',
})
export class TodoItem {
  @Input() todo!: Todo;
  @Output() edit = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<string>(); //id of todo
  @Output() complete = new EventEmitter<Todo>();
  @Output() statusChange = new EventEmitter<Todo>();

  readonly todoStatuses = Object.values(TodoStatus);

  onEdit() {
    this.edit.emit(this.todo);
  }

  onDelete() {
    const deleteConfirm = confirm(`Are you sure you want to delete ${this.todo.title}?`);
    if (deleteConfirm) {
      this.delete.emit(this.todo.id);
    }
  }

  onComplete() {
    this.complete.emit(this.todo);
  }

  onStatusChange(event: Event) {
    const status = (event.target as HTMLSelectElement).value as TodoStatus;

    this.statusChange.emit({
      ...this.todo,
      status: status,
    });
  }
}
