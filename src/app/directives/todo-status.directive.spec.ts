import { ElementRef } from '@angular/core';
import { TodoStatusDirective } from './todo-status.directive';

describe('TodoStatusDirective', () => {
  it('should create an instance', () => {
    const directive = new TodoStatusDirective();
    expect(directive).toBeTruthy();
  });
});
