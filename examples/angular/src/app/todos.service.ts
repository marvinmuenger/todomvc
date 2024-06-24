import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';

export interface Todo {
  title: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TodosService {
    private todosSignal = signal<Todo[]>([]);
    private activeTodos = computed(() => {
      return this.todosSignal().filter(todo => !todo.completed);
    });
    private completedTodos = computed(() => {
      return this.todosSignal().filter(todo => todo.completed);
    });

    todos = this.todosSignal.asReadonly();

    addItem(title: string): void {
      const todo: Todo = {
        title,
        completed: false,
      };
      this.todosSignal.update(todos => {
        return [...todos, todo];
      });
    }

    removeItem(todo: Todo): void {
      const index = this.todos().indexOf(todo);
      if (index > -1) {
        this.todosSignal.update(todos => {
          return todos.slice(0, index).concat(todos.slice(index + 1));
        });
      }
    }

    completeItem(todo: Todo): void {
      this.todosSignal.update(todos => {
        return todos.map(t => t === todo ? { ...t, completed: true } : t);
      });
    }

    clearCompleted(): void {
      this.todosSignal.update(todos => {
        return todos.filter((todo) => !todo.completed);
      });
    }    

    toggleAll(completed: boolean): void {
      this.todosSignal.update(todos => {
        return todos.map((todo) => ({ ...todo, completed }));
      });
    }    

    getItems(type = 'all'): Signal<Todo[]> {
      switch (type) {
        case 'active':
          return this.activeTodos;
        case 'completed':
          return this.completedTodos;
      }

      return this.todos;
    }
}

