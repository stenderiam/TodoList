// TODO: later, to change current methods to pure fanctions



// import TodoListItem from './todolistitem.js';
interface ItodoListType {
  id: number,
  todoListTitle?: string
}
interface ItodoItemType {
  title?: string,
  done?: boolean,
  id: number
}


export default class TodoList {

  todoItems: any;
  itemsStorage: any;
  todoLIST: ItodoListType;
  layout: string;
  todoListContainer: HTMLElement;
  todoFormcontainer: Element;
  headline: HTMLInputElement;
  inputID: HTMLInputElement;
  buttonID: Element;
  todoList: Element;
  removeList: Element;
  deleteTodo: Element;
  todoItem: ItodoItemType;
  itemText: Element;

  deleteLISTEvent: CustomEvent;
  headlineEvent: CustomEvent;

  constructor(todoLIST) {
    this.todoLIST = todoLIST;
    this.todoItems = {};
    this.itemsStorage = JSON.parse(localStorage.getItem(`todoListItem${this.todoLIST.id}`)) || [];
    this.createLayout();
    this.initTodoList();
  }

  initTodoList() {
    this.showItem();
    this.addItemEvent();
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
`;
    this.todoListContainer = document.createElement('div');
    this.todoListContainer.className = 'card';
    this.todoListContainer.innerHTML = this.layout;
    this.todoFormcontainer = document.querySelector('.content');
    this.todoFormcontainer.appendChild(this.todoListContainer);
    //  this.headline = this.todoListContainer.querySelector('.headline-title');
    let headline: HTMLInputElement = document.createElement('input');
    headline.className = 'headline-title';
    this.headline = headline;

    this.itemText = this.todoListContainer.querySelector('.item-text');
    let inputID: HTMLInputElement = document.createElement('input');
    inputID.className = 'item-input--tag add-item';
    inputID.type = 'text';
    inputID.value = "";
    inputID.placeholder = "Add new todo";
    this.itemText.appendChild(inputID);
    this.inputID = inputID;

    let highlight: HTMLSpanElement = document.createElement('span');
    highlight.className = 'highlight';
    let bar: HTMLSpanElement = document.createElement('span');
    bar.className = 'bar';
    this.itemText.appendChild(highlight);
    this.itemText.appendChild(bar);
    this.buttonID = this.todoListContainer.querySelector('.item-submit');
    this.todoList = this.todoListContainer.querySelector('.todo-list');
    this.removeList = this.todoListContainer.querySelector('.clear');
    this.deleteTodo = this.todoListContainer.querySelector('.delete');
  }

  todoCustomEvent() {
    this.deleteLISTEvent = new CustomEvent('deleteLIST', {
      detail: { id: this.todoLIST.id },
    });
    this.headlineEvent = new CustomEvent('headlineChange', {
      detail: {},
    });
  }

  addItemEvent() {
    this.buttonID.addEventListener('click', (e) => {
      e.preventDefault();
      //  if (this.inputID.value.length === 0) return;
      //  const title = this.inputID.value;
      // const title = (<HTMLInputElement>this.todoListContainer.querySelector('.add-item')).value;
      const title = this.inputID.value;
      const maxId = (this.itemsStorage.length > 0 ? Math.max(...this.itemsStorage.map(elem => elem.id)) : 0);
      const todoItem = {
        title,
        done: false,
        id: maxId + 1,
      };
      this.itemsStorage.push(todoItem);
      this.saveItem();
      this.createItem(todoItem);
      this.inputID.value = '';
    });
  }
  saveItem() {
    localStorage.setItem(`todoListItem${this.todoLIST.id}`, JSON.stringify(this.itemsStorage));
  }
  createItem(todoItem) {
    import('./todolistitem.ts').then((module) => {
  const TodoListItem = module.default;
  const todoItemObject = new TodoListItem(this.todoList, this.todoListContainer, todoItem);
  this.todoItems[todoItem.id] = todoItemObject;
});
  }

showItem() {
  this.itemsStorage.forEach((elem) => {
    this.createItem(elem);
  });
}
deleteItem() {
  this.todoListContainer.addEventListener('deleteItem', (e: CustomEvent) => {
    const elId = e.detail.id;
    const index = this.itemsStorage.findIndex(elem => elem.id === elId);
    this.itemsStorage.splice(index, 1);
    this.todoItems[elId].deleteItem();
    delete this.todoItems[elId];
    this.saveItem();
  });
}
updateItem() {
  this.todoListContainer.addEventListener('updateItem', (e: CustomEvent) => {
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
}
clearListOnClick() {
  this.removeList.addEventListener('click', () => {
    this.removeList.classList.remove('button-visible');
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
showDeleteButton() {
  if (this.itemsStorage.lenght !== null) {
    this.removeList.classList.add('button-visible');
  }
  console.log(this.itemsStorage);
}

}
