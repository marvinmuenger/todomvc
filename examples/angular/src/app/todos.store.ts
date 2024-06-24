import { patchState, signalStore, withComputed, withState, withMethods } from '@ngrx/signals';
import { computed } from '@angular/core';
import { Todo } from './todo.interface';

type TodosState = {
    todos: Todo[];
    type: string;
};

const initialState: TodosState = {
    todos: [],
    type: 'all',
};

export const TodosStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({ todos, type }) => ({
        activeTodos: computed(() => todos().filter(todo => !todo.completed)),
        completedTodos: computed(() => todos().filter(todo => todo.completed)),
        displayedTodos: computed(() => {
            switch (type()) {
                case 'active':
                    return todos().filter(todo => !todo.completed)
                case 'completed':
                    return todos().filter(todo => todo.completed)
            }
            return todos();
        })
    })),
    withMethods((store) => ({
        setType(type: string): void {
            console.log(type);
            patchState(store, { type });
        },
        addItem(title: string): void {
            const todo: Todo = {
                title,
                completed: false,
            };
            patchState(store, { todos: [...store.todos(), todo] });
        },
        removeItem(todo: Todo): void {
            const index = store.todos().indexOf(todo);
            patchState(store, { todos: store.todos().slice(0, index).concat(store.todos().slice(index + 1)) });
        },
        completeItem(todo: Todo): void {
            patchState(store, { todos: store.todos().map(t => t === todo ? { ...t, completed: true } : t) });
        },
        updateItem(todo: Todo): void {
            patchState(store, { todos: store.todos().map(t => t === todo ? todo : t) });
        },
        clearCompleted(): void {
            patchState(store, { todos: store.todos().filter((todo) => !todo.completed) });
        },
        toggleAll(completed: boolean): void {
            patchState(store, { todos: store.todos().map((todo) => ({ ...todo, completed })) });
        }
    })
    ));
