// TODO: later, to change current methods to pure fanctions


import TodoListItem from './modules/todolistitem.js';

export default class TodoList {

  constructor(layout, itemsStorage) {
    this.layout = document.querySelector('.container');
    this.layout.insertAdjacentHTML('beforeend', layout);
    this.inputID = document.querySelector('.myinput');
    this.buttonID = document.querySelector('.button');
    this.todoList = document.querySelector('.todo-list');
    this.removeList = document.querySelector('.remove-List');
    this.itemsStorage = itemsStorage;

    this.todoItems = {}; // new TodoItem(s)
    this.init();
  }
  init() {
    this.showCurrentList();
    this.createTodoItemEvent();
    this.deleteTodoItemEvent();
    this.clearListEvent();
    this.updateTodoItemEvent();
  }
  createTodoItemEvent() {
    this.buttonID.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.inputID.value.length === 0) return;
      const title = this.inputID.value;
      const maxId = (this.itemsStorage.length > 0 ? Math.max(...this.itemsStorage.map(elem => elem.id)) : 0);
      const todoItem = {
        title,
        done: false,
        id: maxId + 1,
      };
      this.itemsStorage.push(todoItem);
      this.saveTodoItem();
      this.createNewTodoItem(todoItem);
    });
  }
  saveTodoItem() {
    localStorage.setItem('todolistItems', JSON.stringify(this.itemsStorage));
  }
  createNewTodoItem(todoItem) {
    const todoItemObject = new TodoListItem(this.inputID, this.buttonID, this.todoList, this.itemsStorage, this.removeList, todoItem);
    this.todoItems[todoItem.id] = todoItemObject;
  }
  showCurrentList() {
    this.itemsStorage.forEach((elem) => {
      this.createNewTodoItem(elem);
    });
  }
  deleteTodoItemEvent() {
    document.addEventListener('deleteItem', (e) => {
      const elId = e.detail.id;
      const index = this.itemsStorage.findIndex(elem => elem.id === elId);
      this.itemsStorage.splice(index, 1);
      this.todoItems[elId].deleteItem();
      delete this.todoItems[elId];
      this.saveTodoItem();
    });
  }
  updateTodoItemEvent() {
    document.addEventListener('updateItem', (e) => {
      const elId = e.detail.elem.id;
      const index = this.itemsStorage.findIndex(elem => elem.id === elId);
      this.itemsStorage[index] = e.detail.elem;
      this.saveTodoItem();
    });
  }
  clearList() {
    this.itemsStorage = [];
    this.todoItems = {};
    localStorage.removeItem('todolistItems');
    this.todoList.innerHTML = '';
    this.removeList.classList.add('hidden');
  }
  clearListEvent() {
    this.removeList.addEventListener('click', () => {
      this.clearList();
    });
  }
}
