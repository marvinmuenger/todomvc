import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodosStore } from '../todos.store';
import { Todo } from '../todo.interface';

@Component({
    selector: 'app-todo-list',
    standalone: true,
    imports: [TodoItemComponent],
    templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  private location = inject(Location);
  public store = inject(TodosStore);

  constructor() {
    this.location.onUrlChange(() =>
      this.store.setType(this.location.path().split('/')[1] || 'all')
    );
  }

  get todos() {
    return this.store.displayedTodos;
  }

  get activeTodos() {
    return this.store.activeTodos;
  }

  removeTodo(todo: Todo): void {
    this.store.removeItem(todo);
  }

  completeTodo(todo: Todo): void {
    this.store.completeItem(todo);
  }

  updateTodo(todo: Todo): void {
    this.store.updateItem(todo);
  }

  toggleAll(e: Event) {
    const input = e.target as HTMLInputElement;
    this.store.toggleAll(input.checked);
  }
}
