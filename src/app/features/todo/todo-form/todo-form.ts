import { Component } from '@angular/core';
import { TodoStatus } from '../../../models/todo-status.enum';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TodoService } from '../../../services/todo.service';

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {
  readonly todoStatuses = Object.values(TodoStatus);
  readonly todoForm;

  constructor(private readonly todoService: TodoService) {
    this.todoForm = new FormGroup({
      title: new FormControl('', { nonNullable: true }),
      description: new FormControl('', { nonNullable: true }),
      status: new FormControl(TodoStatus.New, { nonNullable: true }),
    });
  }

  onSubmit() {
    //save todo
    const { title, description, status } = this.todoForm.getRawValue();
    this.todoService.addTask(title, description, status);
  }
}
