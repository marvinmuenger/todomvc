import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../todo.interface';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent implements AfterViewChecked {
  @Input({required: true}) todo!: Todo;

  @Output() remove = new EventEmitter<Todo>();
  @Output() update = new EventEmitter<Todo>();
  @Output() toggle = new EventEmitter<Todo>();

  @ViewChild('todoInputRef') inputRef?: ElementRef;

  title = '';

  isEditing = false;

  toggleTodo(): void {
    this.toggle.emit(this.todo);
  }

  removeTodo(): void {
    this.remove.emit(this.todo);
  }

  startEdit() {
    this.isEditing = true;
  }

  handleBlur(e: Event) {
    this.isEditing = false;
  }

  handleFocus(e: Event) {
    this.title = this.todo.title;
  }

  updateTodo() {
    if (!this.title) {
      this.remove.emit(this.todo);
    } else {
      this.todo.title = this.title;
      this.update.emit(this.todo);
    }

    this.isEditing = false;
  }

  ngAfterViewChecked(): void {
    if (this.isEditing) {
      this.inputRef?.nativeElement.focus();
    }
  }
}
