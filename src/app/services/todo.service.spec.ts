import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { Todo } from '../models/todo.model';
import { TodoStatus } from '../models/todo-status.enum';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  //AddTodo
  it('Todo should be added', () => {
    service.addTask('First Todo', 'This is first todo', TodoStatus.New);

    const tasks = service.getTasks();

    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('First Todo');
    expect(tasks[0].description).toBe('This is first todo');
    expect(tasks[0].status).toBe(TodoStatus.New);
  });

  //getById
  it('should return a todo by id', () => {
    service.addTask('First Todo', 'This is first todo', TodoStatus.New);

    const todo = service.getTasks();
    const result = service.getTaskById(todo[0].id);

    expect(result).toBe(todo[0]);
  });

  //update Todo
  it('should update a todo', () => {
    service.addTask('First Todo', 'This is first todo', TodoStatus.New);

    const todo = service.getTasks()[0];

    const updatedTodo = {
      ...todo,
      title: 'Updated Todo',
      status: TodoStatus.Verified,
    };

    service.updateTask(updatedTodo);
    const result = service.getTaskById(todo.id);

    expect(result?.title).toBe('Updated Todo');
    expect(result?.status).toBe(TodoStatus.Verified);
  });

  it('should delete a todo', () => {
    service.addTask('First Todo', 'This is first todo', TodoStatus.New);
    const todo = service.getTasks()[0];
    service.deleteTask(todo.id);
    expect(service.getTaskById(todo.id)).toBeUndefined();
  });
});
