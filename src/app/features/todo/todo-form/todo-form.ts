import { Component } from '@angular/core';
import { TodoStatus } from '../../../models/todo-status.enum';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from '../../../services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../../../models/todo.model';

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {
  readonly todoStatuses = Object.values(TodoStatus);
  readonly todoForm;
  readonly todoEditId;

  constructor(
    private readonly todoService: TodoService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {
    this.todoEditId = this.route.snapshot.paramMap.get('id');

    this.todoForm = new FormGroup({
      title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      status: new FormControl(TodoStatus.New, { nonNullable: true }),
    });

    //if editmode then load data to form
    this.loadEditableTodo();
  }

  onSubmit(): void {
    //form validation

    if (this.todoForm.invalid) {
      this.todoForm.markAllAsTouched();
      return;
    }
    const { title, description, status } = this.todoForm.getRawValue();

    //editId available then edit, else add
    if (this.todoEditId) {
      const existingTodo = this.todoService.getTaskById(this.todoEditId);

      if (!existingTodo) {
        this.router.navigate(['/todos']);
        return;
      }

      const updatedTodo: Todo = {
        ...existingTodo,
        title: title.trim(),
        description: description.trim(),
        status: status,
      };

      this.todoService.updateTask(updatedTodo);
    } else {
      this.todoService.addTask(title, description, status);
    }
    this.router.navigate(['/todos']);
  }

  onCancel(): void {
    this.router.navigate(['/todos']);
  }

  loadEditableTodo(): void {
    if (!this.todoEditId) {
      return;
    }

    const todo = this.todoService.getTaskById(this.todoEditId);

    if (!todo) {
      this.router.navigate(['/todos']);
      return;
    }

    this.todoForm.patchValue({
      title: todo.title,
      description: todo.description,
      status: todo.status,
    });
  }
}
