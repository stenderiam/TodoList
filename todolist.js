
// import { ToDoListItem } from "./todolistitem.js";

const ToDoListItem = require('./todolistitem.js').default;

export default class ToDoList {

  constructor(inputTest, btn) {
    //  this.todoList = todoList;
    //  this.todoForm = todoForm;
    // this.removeList = removeList;
    // this.itemsStorage = itemsStorage;
    this.btn = btn;
    this.inputTest = inputTest;
    this.todoForm = document.querySelector('.add-todo');
    this.removeList = document.querySelector('.remove-List');
    this.todoList = document.querySelector('.todo-list');
    this.itemsStorage = JSON.parse(localStorage.getItem('todo-list')) || [
      {
        title: 'Duplicate door key',
        done: false,
      },
      {
        title: 'Boom Shka lak',
        done: true,
      },
    ];
    this.init();
  }

  init() {
    this.handler();
    this.showList();
  }

  showList() {
    // storage.setItem(keyName, keyValue);
    localStorage.setItem('todo-list', JSON.stringify(this.itemsStorage));
    this.createList(this.itemsStorage, this.todoList);
    // this.showRemoveButton();
  }

  createList(list = [], listTarget) {
    listTarget.innerHTML = list.map((item, i) => `<li class="list-content">
                  <input class="one-list-item" type="text" for="todo${i}" value="${item.title}">
                  <input type="checkbox" class="checkDone" id="todo${i}" data-index="${i}" ${item.done ? 'checked' : ''} />
                  <span id="delete" class="delete" data-index="${i}">X</span>
           </li>`).join('');
  }

  handler() {
    this.btn.addEventListener('click', (e) => {
      e.preventDefault();
      new ToDoListItem(this.btn, this.inputTest, this.todoList, this.todoForm, this.removeList, this.itemsStorage, this.createList);
    });
  }
  /*  const myEvent = new CustomEvent('deleteEvent', {
   detail: {
     deleted: 'yep',
     },
 }); */

  /*   this.todoList.addEventListener('deleteEvent', (e) => {
       console.log('Event is: ', e.detail);
     }); */

}
