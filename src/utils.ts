const span = document.querySelector('span') as HTMLSpanElement;
const todoList = document.querySelector('.todos') as HTMLLIElement;
span.innerHTML = '0';

export function renderTodos(collection) {
  span.innerHTML = collection.length;
  todoList.innerHTML = '';
  for (const item of collection) {
    todoList.innerHTML += `
    	<li class="list-group-item">
	      ${item.label}
        <button type="button" class = "right btn btn-danger" data-todo='${JSON.stringify(item)}'>
          Delete
        </button>
      </li>
     `;
  }
}
