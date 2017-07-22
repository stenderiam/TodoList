
import todoItem from "./todolistitem.js";
import itemsStorage from "./localStorage.js";

export default class ToDoList {

  constructor(layout) {
    // создание контейнера для todo list
    this.layout = document.querySelector('.cntr');
    this.layout.insertAdjacentHTML('beforeend', layout);
    // получение данных для компановки todo list
    this.inputID = document.querySelector('.myinput');
    this.buttonID = document.querySelector('.button');
    this.todoList = document.querySelector('.todo-list');
    this.removeList = document.querySelector('.remove-List');
    this.itemsStorage = itemsStorage;
    this.id = 0;
    this.listArray = [];
    this.init();
  }

  init() {
    this.showCurrentList();
    this.createTodoItem();
    this.deleteEventListen();
  }

  // создать новую запись по клику на кнопку
  createTodoItem() {
    this.buttonID.addEventListener('click', (e) => {
      e.preventDefault();
      new todoItem(this.inputID, this.buttonID, this.todoList, this.itemsStorage, this.id++, this.removeList);
      //  console.log(this.inputID);
    });
  }
  // показать при старте все записи листа
  showCurrentList() {
    this.itemsStorage.forEach(() => {
      this.listArray.push(new todoItem(this.inputID, this.buttonID, this.todoList, this.itemsStorage, this.id++, this.removeList));
    });
  }
  deleteEventListen() {
    document.addEventListener('deleteItem', (e) => {
      console.log('list', e);
    });
  }
}
