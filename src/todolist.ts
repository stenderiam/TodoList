// TODO: later, to change current methods to pure fanctions
import ItodoListType from './ItodoListType';
import ItodoItemType from './ItodoItemType';

export default class TodoList {

  todoLIST: ItodoListType;
  itemsStorage: any;
  todoItems: any;
  layout: string;
  todoListContainer: HTMLElement;
  headline: HTMLInputElement;
  inputID: HTMLInputElement;
  buttonID: HTMLInputElement;
  todoList: HTMLUListElement;
  removeList: HTMLButtonElement;
  deleteTodo: HTMLButtonElement;
  deleteLISTEvent: CustomEvent;
  headlineEvent: CustomEvent;

  constructor(todoLIST: ItodoListType) {
    this.todoLIST = todoLIST;
    this.todoItems = {};
    this.itemsStorage = JSON.parse(localStorage.getItem(`todoListItem${this.todoLIST.id}`)) || [];
    this.createLayout();
    this.initTodoList();
  }

  createLayout() {
    this.createTodoContainer();
    this.headline = this.createHeadline(this.todoLIST);
    this.inputID = this.createInputToAdd();
    this.buttonID = this.createInputToSubmit();
    this.todoList = (this.todoListContainer.querySelector('.todo-list') as HTMLUListElement);
    this.removeList = this.createClearListBtn();
    this.deleteTodo = this.createDeleteTodoBtn();
  }

  initTodoList() {
    this.showItem();
    this.initItemEvent();
    this.todoCustomEvent();
    this.deleteItemEvent();
    this.updateItemEvent();
    this.clearListOnClick();
    this.clearTodoOnClick();
    this.deleteTodoListEvent();
    this.headlineChangeEvent();
  }


  createTodoContainer() {
    this.layout = `<form class="card-form" autocomplete="off">
          <div class="headline">          
          </div>
          <ul class="todo-list">
          </ul>
          <div class="new-item">
            <div class="item-input">            
            </div>
            <div class="item-text">    
            </div>
          </div>
        </form>
        <div class="list-button">
          <div class="clear-list">           
          </div>
          <div class="delete-list">       
          </div>
        </div>`;
    this.todoListContainer = document.createElement('div');
    this.todoListContainer.className = 'card';
    this.todoListContainer.innerHTML = this.layout;
    let todoFormcontainer = document.querySelector('.content');
    todoFormcontainer.appendChild(this.todoListContainer);
  }

  createHeadline(todoLIST: ItodoListType): HTMLInputElement {
    let headlineDiv = this.todoListContainer.querySelector('.headline');
    let headlineInput = document.createElement('input');
    headlineInput.className = 'headline-title';
    headlineInput.type = 'text';
    headlineInput.placeholder = "Title";
    headlineInput.value = `${todoLIST.todoListTitle}`;
    headlineDiv.appendChild(headlineInput);
    return headlineInput;
  }

  createInputToAdd(): HTMLInputElement {
    let inputDiv = this.todoListContainer.querySelector('.item-text');
    let inputToAdd = document.createElement('input');
    let highlight: HTMLSpanElement = document.createElement('span');
    let bar: HTMLSpanElement = document.createElement('span');
    inputToAdd.className = 'item-input--tag add-item';
    inputToAdd.type = 'text';
    inputToAdd.value = "";
    inputToAdd.placeholder = "Add new todo";
    highlight.className = 'highlight';
    bar.className = 'bar';
    inputDiv.appendChild(inputToAdd);
    inputDiv.appendChild(highlight);
    inputDiv.appendChild(bar);
    return inputToAdd;
  }

  createInputToSubmit(): HTMLInputElement {
    let inputSubmitDiv = this.todoListContainer.querySelector('.item-input');
    let inputToSubmit = document.createElement('input');
    inputToSubmit.className = 'item-submit';
    inputToSubmit.type = 'submit';
    inputToSubmit.value = "+";
    inputSubmitDiv.appendChild(inputToSubmit);
    return inputToSubmit;
  }

  createClearListBtn(): HTMLButtonElement {
    let clearListDiv = this.todoListContainer.querySelector('.clear-list');
    let clearListBtn = document.createElement('button');
    let clearText = document.createTextNode('clear')
    clearListBtn.className = 'delete-button clear';
    clearListBtn.type = 'button';
    clearListDiv.appendChild(clearListBtn);
    clearListBtn.appendChild(clearText);
    return clearListBtn;
  }

  createDeleteTodoBtn(): HTMLButtonElement {
    let deleteTodoDiv = this.todoListContainer.querySelector('.delete-list');
    let deleteTodoBtn = document.createElement('button');
    let clearText = document.createTextNode('delete')
    deleteTodoBtn.className = 'delete-button delete';
    deleteTodoBtn.type = 'button';
    deleteTodoDiv.appendChild(deleteTodoBtn);
    deleteTodoBtn.appendChild(clearText);
    return deleteTodoBtn;
  }

  todoCustomEvent() {
    this.deleteLISTEvent = new CustomEvent('deleteLIST', {
      detail: { id: this.todoLIST.id },
    });
    this.headlineEvent = new CustomEvent('headlineChange', {
      detail: {},
    });
  }

  initItemEvent() {
    this.buttonID.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.inputID.value.length === 0) return;
      const title = this.inputID.value;
      const maxId = (this.itemsStorage.length > 0 ? Math.max(...this.itemsStorage.map(elem => elem.id)) : 0);
      const todoItem: ItodoItemType = {
        title,
        done: false,
        id: maxId + 1,
      };
      this.itemsStorage.push(todoItem);
      this.saveItem(this.todoLIST);
      this.createItem(todoItem);
      this.inputID.value = '';
    });
  }
  saveItem(todoLIST: ItodoListType) {
    return localStorage.setItem(`todoListItem${todoLIST.id}`, JSON.stringify(this.itemsStorage));
  }

  createItem(todoItem: ItodoItemType) {
    System.import('./todolistitem.ts').then((module) => {
      const TodoListItem = module.default;
      const todoItemObject = new TodoListItem(this.todoList, todoItem);
      this.todoItems[todoItem.id] = todoItemObject;
    });

  }

  showItem() {
    this.itemsStorage.forEach((elem) => {
      this.createItem(elem);
    });
  }
  deleteItemEvent() {
    this.todoList.addEventListener('deleteItem', (e: CustomEvent) => {
      const elId = e.detail.id;
      const index = this.itemsStorage.findIndex(elem => elem.id === elId);
      this.itemsStorage.splice(index, 1);
      this.todoItems[elId].deleteItem();
      delete this.todoItems[elId];
      this.saveItem(this.todoLIST);
    });
  }
  updateItemEvent() {
    this.todoList.addEventListener('updateItem', (e: CustomEvent) => {
      const elId = e.detail.elem.id;
      const index = this.itemsStorage.findIndex(elem => elem.id === elId);
      this.itemsStorage[index] = e.detail.elem;
      this.saveItem(this.todoLIST);
    });
  }

  clearList(todoLIST: ItodoListType) {
    this.itemsStorage = [];
    this.todoItems = {};
    localStorage.removeItem(`todoListItem${todoLIST.id}`);
    this.todoList.innerHTML = '';
  }
  clearListOnClick() {
    this.removeList.addEventListener('click', () => {
      this.removeList.classList.remove('button-visible');
      this.clearList(this.todoLIST);
    });
  }
  clearTodoOnClick() {
    this.deleteTodo.addEventListener('click', () => {
      this.clearList(this.todoLIST);
    });
  }
  headlineChangeEvent() {
    this.headline.addEventListener('change', () => {
      this.headlineEvent.detail.todoLIST = Object.assign({}, this.todoLIST, { todoListTitle: this.headline.value });
      document.dispatchEvent(this.headlineEvent);
    });
  }

  deleteTodoListEvent() {
    this.deleteTodo.addEventListener('click', () => {
      document.dispatchEvent(this.deleteLISTEvent);
    });
  }
  onDeleteList() {
    this.todoListContainer.remove();
  }
}
