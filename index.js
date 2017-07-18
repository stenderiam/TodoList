
import ToDoList from './todolist.js';

// const ToDoList = require('./todolist.js').default;

function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

const init = function () {
  // const todoList = document.querySelector('.todo-list');

  /* const itemsStorage = JSON.parse(localStorage.getItem('todo-list')) || [
    {
      title: 'Duplicate door key',
      done: false,
    },
    {
      title: 'Boom Shka lak',
      done: true,
    },
  ]; */

  const inputTest = document.querySelector('.myinput');
  const btn = document.querySelector('.button');

  new ToDoList(inputTest, btn);
};
ready(init);
