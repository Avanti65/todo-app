import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
import { TodoStatus } from '../models/todo-status.enum';

@Directive({
  selector: '[appTodoStatus]',
  standalone: true,
})
export class TodoStatusDirective implements OnChanges {
  @Input() appTodoStatus!: TodoStatus;
  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2,
  ) {}

  ngOnChanges() {
    const element = this.elementRef.nativeElement;

    // Remove previous classes
    this.renderer.removeClass(element, 'todo-status-new');
    this.renderer.removeClass(element, 'todo-status-in-progress');
    this.renderer.removeClass(element, 'todo-status-completed');
    this.renderer.removeClass(element, 'todo-status-rejected');
    this.renderer.removeClass(element, 'todo-status-verified');

    if (this.appTodoStatus === TodoStatus.New) {
      this.renderer.addClass(element, 'todo-status-new');
    }

    if (this.appTodoStatus === TodoStatus.InProgress) {
      this.renderer.addClass(element, 'todo-status-in-progress');
    }

    if (this.appTodoStatus === TodoStatus.Completed) {
      this.renderer.addClass(element, 'todo-status-completed');
    }

    if (this.appTodoStatus === TodoStatus.Verified) {
      this.renderer.addClass(element, 'todo-status-verified');
    }

    if (this.appTodoStatus === TodoStatus.Rejected) {
      this.renderer.addClass(element, 'todo-status-rejected');
    }
  }
}
