
import TodoList from './todolist';
import ItodoListType from './ItodoListType';
let fab = require('../icons/fab.svg');



export default class TodoBuilder {
  ListStorage: Array<ItodoListType>;
  allTodo: Object;
  boardHeader: string;
  boardContainer: HTMLElement;
  addTodoList: Element;
  todoLIST: ItodoListType;

  constructor() {
    this.ListStorage = JSON.parse(localStorage.getItem('allTodoStorage')) || [];
    this.allTodo = {};
    this.buildLayout();
    this.initBuilder();
  }

  initBuilder() {
    this.addTodoListEvent();
    this.showList(this.ListStorage);
    this.bindHandler();
    this.initCustomEvent();
  }

  buildLayout() {
    this.boardHeader = `
                <div class="toolbar ">
                  <div class="logo">
                    ToDo List
                  </div>
                </div>
                <div class="fab">
                  <button class="fab-button" type="button"><img src="${fab}" alt="fab icon"></button>
                </div>
                <div class="content"></div>
        `;
    const container: Element = document.querySelector('.board-wrapper');
    container.insertAdjacentHTML('afterbegin', this.boardHeader);
    this.addTodoList = document.querySelector('.fab');
  }
  addTodoListEvent() {
    this.addTodoList.addEventListener('click', (e) => {
      e.preventDefault();
      const maxListId = (this.ListStorage.length > 0 ? Math.max(...this.ListStorage.map(elem => elem.id)) : 0);
      const todoLIST: ItodoListType = {
        id: maxListId + 1,
        todoListTitle: '',
      };
      this.ListStorage.push(todoLIST);
      this.saveTodoList(this.ListStorage);
      this.createTodoList(todoLIST);
    });
  }

  saveTodoList(ListStorage: any): any {
    return localStorage.setItem('allTodoStorage', JSON.stringify(ListStorage));
  }
  showList(ListStorage: any): any {
    return ListStorage.forEach((elemLIST) => {
      this.createTodoList(elemLIST);
    });
  }
  createTodoList(todoLIST: ItodoListType) {
    const todoListObject = new TodoList(todoLIST);
    this.allTodo[todoLIST.id] = todoListObject;
  }

  initCustomEvent() {
    document.addEventListener('deleteLIST', this.deleteTodoListHandler);
    document.addEventListener('headlineChange', this.headlineHandler);
  }

  headlineHandler(e: CustomEvent) {
    const elId = e.detail.todoLIST.id;
    const index = this.ListStorage.findIndex(todoLIST => todoLIST.id === elId);
    this.ListStorage[index] = e.detail.todoLIST;
    this.saveTodoList(this.ListStorage);
  }
  deleteTodoListHandler(e: CustomEvent) {
    const elId = e.detail.id;
    const index = this.ListStorage.findIndex(elem => elem.id === elId);
    this.ListStorage.splice(index, 1);
    this.allTodo[elId].onDeleteList();
    delete this.allTodo[elId];
    this.saveTodoList(this.ListStorage);
  }
  bindHandler() {
    this.headlineHandler = this.headlineHandler.bind(this);
    this.deleteTodoListHandler = this.deleteTodoListHandler.bind(this);
  }
}
