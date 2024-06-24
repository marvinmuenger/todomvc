import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Todo } from '../todo.interface';
import { TodosStore } from '../todos.store';

@Component({
  selector: 'app-todo-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  readonly store = inject(TodosStore);

  get filter(): string {
    return this.store.type();
  }
}
