
// import { ToDoListItem } from "./todolistitem.js";

const ToDoListItem = require('./todolistitem.js').default;

export default class ToDoList {

  constructor(inputTest, btn, todoList, todoForm, removeList, itemsStorage) {
    this.todoList = todoList;
    this.todoForm = todoForm;
    this.removeList = removeList;
    this.itemsStorage = itemsStorage;
    this.btn = btn;
    this.inputTest = inputTest;

    this.init();
  }

  init() {
    this.handler();
  }

  handler() {
    this.btn.addEventListener('click', (e) => {
      e.preventDefault();
      new ToDoListItem(this.btn, this.inputTest, this.todoList, this.todoForm, this.removeList, this.itemsStorage);
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
