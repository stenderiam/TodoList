// TODO: later, to change current methods to pure fanctions


import TodoListItem from './todolistitem.js';

export default class TodoList {

  constructor(todoLIST) {
    this.todoLIST = todoLIST;
    this.todoItems = {};
    this.itemsStorage = JSON.parse(localStorage.getItem(`todoListItem${this.todoLIST.id}`)) || [];
    this.createLayout();
    this.initTodoList();
  }

  initTodoList() {
    this.showItem();
    this.addNewItem();
    this.todoCustomEvent();
    this.deleteItem();
    this.updateItem();
    this.clearListOnClick();
    this.clearTodoOnClick();
    this.deleteTodoList();
    this.headlineChange();
  }

  createLayout() {
    this.layout = `
       <div class="todoList-container"> 
         <input class="headline" type="text" value ="${this.todoLIST.todoListTitle}"> 
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
  }

  todoCustomEvent() {
    this.deleteLISTEvent = new CustomEvent('deleteLIST', {
      detail: { id: this.todoLIST.id },
    });
    this.headlineEvent = new CustomEvent('headlineChange', {
      detail: {},
    });
  }

  addNewItem() {
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
      this.saveItem();
      this.createItem(todoItem);
    });
  }
  saveItem() {
    localStorage.setItem(`todoListItem${this.todoLIST.id}`, JSON.stringify(this.itemsStorage));
  }
  createItem(todoItem) {
    const todoItemObject = new TodoListItem(this.todoList, this.todoListContainer, todoItem);
    this.todoItems[todoItem.id] = todoItemObject;
  }
  showItem() {
    this.itemsStorage.forEach((elem) => {
      this.createItem(elem);
    });
  }
  deleteItem() {
    this.todoListContainer.addEventListener('deleteItem', (e) => {
      const elId = e.detail.id;
      const index = this.itemsStorage.findIndex(elem => elem.id === elId);
      this.itemsStorage.splice(index, 1);
      this.todoItems[elId].deleteItem();
      delete this.todoItems[elId];
      this.saveItem();
    });
  }
  updateItem() {
    this.todoListContainer.addEventListener('updateItem', (e) => {
      const elId = e.detail.elem.id;
      const index = this.itemsStorage.findIndex(elem => elem.id === elId);
      this.itemsStorage[index] = e.detail.elem;
      this.saveItem();
    });
  }
  clearList() {
    this.itemsStorage = [];
    this.todoItems = {};
    localStorage.removeItem(`todoListItem${this.todoLIST.id}`);
    this.todoList.innerHTML = '';
    this.removeList.classList.add('hidden');
  }
  clearListOnClick() {
    this.removeList.addEventListener('click', () => {
      this.clearList();
    });
  }
  clearTodoOnClick() {
    this.deleteTodo.addEventListener('click', () => {
      this.clearList();
    });
  }
  headlineChange() {
    this.headline.addEventListener('change', () => {
      this.headlineEvent.detail.todoLIST = Object.assign({}, this.todoLIST, { todoListTitle: this.headline.value });
      document.dispatchEvent(this.headlineEvent);
    });
  }
  deleteTodoList() {
    this.deleteTodo.addEventListener('click', () => {
      document.dispatchEvent(this.deleteLISTEvent);
    });
  }
  onDeleteList() {
    this.todoListContainer.remove();
  }
}
