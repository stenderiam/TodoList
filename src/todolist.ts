// TODO: later, to change current methods to pure fanctions
import ItodoListType from './ItodoListType';
import ItodoItemType from './ItodoItemType';

export default class TodoList {

  todoLIST: ItodoListType;
  itemsStorage: any;
  todoItems: Object;
  content: Element;
  card: HTMLElement;
  headline: HTMLInputElement;
  inputID: HTMLInputElement;
  buttonID: HTMLInputElement;
  todoList: HTMLUListElement;
  removeList: HTMLButtonElement;
  deleteTodo: HTMLButtonElement;
  deleteListEvent: CustomEvent;
  headlineEvent: CustomEvent;


  constructor(todoLIST: ItodoListType) {
    this.todoLIST = todoLIST;
    this.todoItems = {};
    this.itemsStorage = JSON.parse(localStorage.getItem(`todoListItem${this.todoLIST.id}`)) || [];
    this.createLayout();
    this.getLayoutElement();
    this.initTodoList();
  }

  createLayout() {
    const layout: string = `  
      <div class="card" > 
      <form class="card-form" autocomplete="off">
          <div class="headline">
            <input class="headline-title" placeholder="Title" value="${this.todoLIST.todoListTitle}">
          </div>
          <ul class="todo-list">
          </ul>
          <div class="new-item">
            <div class="item-input">
              <input class="item-submit" type="submit" alt="Submit" value="+" />
            </div>
            <div class="item-text">
              <input class="item-input--tag add-item" placeholder="Add new todo" value="">
              <span class="highlight"></span>
              <span class="bar"></span>
            </div>
          </div>
        </form>
        <div class="list-button">
          <div class="clear-list">
            <button class="delete-button clear " type="button">clear</button>
          </div>
          <div class="delete-list">
            <button class="delete-button delete" type="button">delete</button>
          </div>
        </div>
        </div>
        `;
    this.content = document.querySelector('.content');
    this.content.insertAdjacentHTML('afterbegin', layout);
  }
  getLayoutElement() {
    this.card = (<HTMLElement>this.content.querySelector('.card'));
    this.inputID = (<HTMLInputElement>this.content.querySelector('.add-item'));
    this.buttonID = (<HTMLInputElement>this.content.querySelector('.item-submit'));
    this.headline = (<HTMLInputElement>this.content.querySelector('.headline-title'));
    this.todoList = (<HTMLUListElement>this.content.querySelector('.todo-list'));
    this.removeList = (<HTMLButtonElement>this.content.querySelector('.clear'));
    this.deleteTodo = (<HTMLButtonElement>this.content.querySelector('.delete'));
  }

  initTodoList() {
    this.showItem();
    this.initItemEvent();
    this.initTodoCustomEvent();
    this.deleteItemEvent();
    this.updateItemEvent();
    this.clearListOnClick();
    this.clearTodoOnClick();
    this.deleteTodoListEvent();
    this.headlineChangeEvent();
  }


  initTodoCustomEvent() {
    this.deleteListEvent = new CustomEvent('deleteLIST', {
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
    import('./todolistitem.ts').then((module) => {
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
    document.dispatchEvent(this.deleteListEvent);
  });
}
onDeleteList() {
  this.card.remove();
}
}
