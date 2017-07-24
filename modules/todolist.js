// TODO: later, to change current methods to pure fanctions


import TodoListItem from './todolistitem.js';

export default class TodoList {

  constructor(itemsStorage, todoLIST) {
    this.layout = `
       <div class="todoList-container"> 
         <input class="headline" type="text" value =" ${todoLIST.todoListTitle}"> 
         <input class="delete-button" type="submit" value="delete list">
             
          <div id="add-todo">
            <form class="add-todo">
                <input class="myinput" type="text" placeholder="Don't Forget to..." name="item" required>
                <input class="button" type="submit" value="+">
            </form>
        </div>
          <ul class="todo-list"></ul>
          <div class="remove-List">Remove All Items</div>
        </div>
    `;
    this.todoListContainer = document.createElement('div');
    this.todoListContainer.innerHTML = this.layout;
    this.container = document.querySelector('.container');
    this.container.appendChild(this.todoListContainer);
    this.headline = this.todoListContainer.querySelector('.headline');
    this.inputID = this.todoListContainer.querySelector('.myinput');
    this.buttonID = this.todoListContainer.querySelector('.button');
    this.todoList = this.todoListContainer.querySelector('.todo-list');
    this.removeList = this.todoListContainer.querySelector('.remove-List');
    this.deleteTodo = this.todoListContainer.querySelector('.delete-button');
    this.itemsStorage = JSON.parse(localStorage.getItem(`todolistItems${todoLIST.id}`)) || [];
    this.todoItems = {}; // new TodoItem(s)
    this.todoLIST = todoLIST;
    this.deleteLISTEvent = new CustomEvent('deleteLIST', {
      detail: { id: todoLIST.id },
    });
    this.headlineEvent = new CustomEvent('headlineInputChange', {
      detail: {},
    });
    this.init();
  }
  init() {
    this.showCurrentList();
    this.createTodoItemEvent();
    this.deleteTodoItemEvent();
    this.clearListEvent();
    this.updateTodoItemEvent();
    this.removeTodoLIST();
    this.headlineChange();
  }

  headlineChange() {
    this.headline.addEventListener('change', () => {
      this.headlineEvent.detail.todoLIST = Object.assign({}, this.todoLIST, { todoListTitle: this.headline.value });
      document.dispatchEvent(this.headlineEvent);
    });
  }

  removeTodoLIST() {
    this.deleteTodo.addEventListener('click', () => {
      document.dispatchEvent(this.deleteLISTEvent);
    });
  }
  deleteLIST() {
    this.todoListContainer.remove();
  }
  createTodoItemEvent() {
    this.buttonID.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.inputID.value.length === 0) return;
      const todoTitle = this.headline.value;
      const title = this.inputID.value;
      const maxId = (this.itemsStorage.length > 0 ? Math.max(...this.itemsStorage.map(elem => elem.id)) : 0);
      const todoItem = {
        todoTitle,
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
    localStorage.setItem(`todolistItems${this.todoLIST.id}`, JSON.stringify(this.itemsStorage));
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
    localStorage.removeItem(`todolistItems${this.todoLIST.id}`);
    this.todoList.innerHTML = '';
    this.removeList.classList.add('hidden');
  }
  clearListEvent() {
    this.removeList.addEventListener('click', () => {
      this.clearList();
    });
  }
}
