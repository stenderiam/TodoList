
import todoItem from "./todolistitem.js";
// import itemsStorage from "./localStorage.js";

export default class ToDoList {

  constructor(layout, itemsStorage) {
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
    this.itemsArray = [];
    this.init();
  }

  init() {
    this.showCurrentList();
    this.createTodoItem();
    this.deleteEventListen();
    this.clearListEvent();
    this.saveItemEventListen();
  }

  // создать новую запись по клику на кнопку
  createTodoItem() {
    this.buttonID.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.inputID.value.length === 0) return;
      const title = this.inputID.value;
      const maxId = Math.max.apply(Math, this.itemsStorage.map((elem) => { return elem.id; }))
      const todo = {
        title,
        done: false,
        id: maxId + 1,
      };
      this.itemsStorage.push(todo);
      new todoItem(this.inputID, this.buttonID, this.todoList, this.itemsStorage, this.removeList, todo);
      //  console.log(this.inputID);
    });
  }
  // показать при старте все записи листа
  showCurrentList() {
    this.itemsStorage.forEach((elem) => {
      this.itemsArray.push(new todoItem(this.inputID, this.buttonID, this.todoList, this.itemsStorage, this.id++, this.removeList, elem));
    });
  }
  // удалить одну запись
  deleteEventListen() {
    document.addEventListener('deleteItem', (e) => {
      const el = e.target;
      const elemWithId = this.itemsStorage.findIndex(elem => elem.id === el);
      console.log(elemWithId);
      this.itemsStorage.splice(elemWithId, 1);
      this.saveItem();
    });
  }

  // сохранить в localStorage
  saveItemEventListen() {
    document.addEventListener('saveItem', (e) => {
      this.saveItem();
    });
  }

  saveItem() {
    localStorage.setItem('todo-list', JSON.stringify(this.itemsStorage));
  }

  clearList() {
    this.itemsStorage = [];
    this.itemsArray = [];
    localStorage.removeItem('todo-list');
    this.todoList.innerHTML = '';
    this.removeList.classList.add('hidden');
  }
  // удалить записи по клику на кнопку
  clearListEvent() {
    this.removeList.addEventListener('click', () => {
      this.clearList();
    });
  }
}
