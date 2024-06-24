import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodosStore } from '../todos.store';

@Component({
  standalone: true,
  selector: 'app-todo-header',
  imports: [FormsModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  readonly store = inject(TodosStore);

  title = '';

  addTodo() {
    if (this.title) {
      this.store.addItem(this.title);

      // Reset title to clear input field.
      this.title = '';
    }
  }
}
