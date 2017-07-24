import TodoList from './todolist.js';

export default class TodoBuilder {

  constructor(addLists) {
    this.container = document.querySelector('.container');
    this.container.insertAdjacentHTML('afterend', addLists);
    this.addLists = document.querySelector('.add-list');
    this.ListStorage = JSON.parse(localStorage.getItem('todoLISTStorage')) || [];
    this.todoLISTS = {};
    this.createTodoLIST();
    this.showCurrentLISTS();
    this.deleteTodoLISTEvent();
    this.headlineChangeEvent();
  }

  createTodoLIST() {
    this.addLists.addEventListener('click', (e) => {
      e.preventDefault();
      //  const title = this.inputID.value;
      const maxListId = (this.ListStorage.length > 0 ? Math.max(...this.ListStorage.map(elem => elem.id)) : 0);
      const todoLIST = {
        id: maxListId + 1,
        todoListTitle: '',
      };
      this.ListStorage.push(todoLIST);
      this.saveTodoList();
      this.createNewTodoLIST(todoLIST);
      //  console.log(this.ListStorage);
    });
  }

  headlineChangeEvent() {
    document.addEventListener('headlineInputChange', (e) => {
      console.log('ffff');
      const elId = e.detail.todoLIST.id;
      const index = this.ListStorage.findIndex(todoLIST => todoLIST.id === elId);
      this.ListStorage[index] = e.detail.todoLIST;
      this.saveTodoList();
      console.log(this.ListStorage);
    });
  }

  saveTodoList() {
    localStorage.setItem('todoLISTStorage', JSON.stringify(this.ListStorage));
  }

  showCurrentLISTS() {
    this.ListStorage.forEach((elemLIST) => {
      this.createNewTodoLIST(elemLIST);
    });
  }

  createNewTodoLIST(todoLIST) {
    const todoListObject = new TodoList(this.itemsStorage, todoLIST);
    this.todoLISTS[todoLIST.id] = todoListObject;
  }

  deleteTodoLISTEvent() {
    document.addEventListener('deleteLIST', (e) => {
      const elId = e.detail.id;
      const index = this.ListStorage.findIndex(elem => elem.id === elId);
      this.ListStorage.splice(index, 1);
      this.todoLISTS[elId].deleteLIST();
      delete this.todoLISTS[elId];
      this.saveTodoList();
    });
  }
}
