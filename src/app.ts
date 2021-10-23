import { renderTodos } from './utils';
import * as fromStore from './store';

const input = document.querySelector('input') as HTMLInputElement;
const button = document.querySelector('button') as HTMLButtonElement;
const destroy = document.querySelector('.unsubscribe') as HTMLButtonElement;
const todoList = document.querySelector('.todos') as HTMLLIElement;
const subscribe = document.querySelector('.subscribe') as HTMLButtonElement;
destroy.disabled = true;

const reducers = {
  todos: fromStore.reducer
}
const store = new fromStore.Store(reducers, {});

button.addEventListener(
  'click',
  () => {
    if (!input.value.trim()) return;

    const payload = { label: input.value, complete: false };
    store.dispatch(new fromStore.AddTodo(payload));

    console.log(store.value);
    input.value = '';
  },
  false
);

todoList.addEventListener('click', function(event) {
  const target = event.target as HTMLButtonElement;
  if (target.nodeName.toLowerCase() === 'button') {
    const todo = JSON.parse(target.getAttribute('data-todo') as any);
    store.dispatch(new fromStore.RemoveTodo(todo));
  }
});

let unsubscribe: any;
function subscribeOnTodos() {
  subscribe.disabled = true;
  destroy.disabled = false;
  unsubscribe = store.subscribe(state => {
    renderTodos(state.todos.data);
  });
}
subscribeOnTodos();
subscribe.addEventListener('click', () => {
  subscribeOnTodos();
}, false);

destroy.addEventListener('click', () => {
  unsubscribe();
  subscribe.disabled = false;
  destroy.disabled = true;
}, false);

