
import ToDoListItem from './todolistitem.js';


function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

const init = function () {
  // const btnPush = document.getElementById('button');
  // const inputID = document.getElementById('myinput');
  //   const autocompleteOne = new Autocomplete(data, "myInput");
  //    const todoOne = new ToDoList(title);
  //  const todoListItemsStorage = JSON.parse(localStorage.getItem(this.todoList));
  //   const todoList = document.getElementById('note-menu');
  const input = document.querySelector('.myinput');
  const btn = document.querySelector('.button');

  const todoList = document.querySelector('.todo-list');
  const todoForm = document.querySelector('.add-todo');
  const removeList = document.querySelector('.remove-List');

  const itemsStorage = JSON.parse(localStorage.getItem('todo-list')) || [
    {
      title: 'Duplicate door key',
      done: false,
    },
    {
      title: 'Boom Shka lak',
      done: true,
    },
  ];


  const todoOne = new ToDoListItem(btn, input, todoList, todoForm, removeList, itemsStorage);
};
ready(init);
