import TodoList from './todolist.js';



export default class TodoBuilder {


  constructor(addLists) {
    this.container = document.querySelector('.container');
    this.container.insertAdjacentHTML('afterend', addLists);
    this.addLists = document.querySelector('.add-list');

    this.ListStorage = JSON.parse(localStorage.getItem('todoLISTStorage')) || [];
    this.itemsStorage = JSON.parse(localStorage.getItem('todolistItems')) || [];
    this.todoLISTS = {};
    this.createTodoLIST();
    this.showCurrentLISTS();
    this.deleteTodoLISTEvent();
  }

  createTodoLIST() {
    this.addLists.addEventListener('click', (e) => {
      e.preventDefault();
      //  const title = this.inputID.value;
      const maxListId = (this.ListStorage.length > 0 ? Math.max(...this.ListStorage.map(elem => elem.id)) : 0);
      this.pushListId = maxListId + 1;
      const todoListObject = new TodoList(this.itemsStorage, this.pushListId);
      const todoLIST = {
        id: this.pushListId,
        todoListObject,
      };
      this.ListStorage.push(todoLIST);
      this.saveTodoList();
      //  this.createNewTodoItem(todoLIST);
      this.todoLISTS[todoLIST.id] = todoListObject;
      console.log(this.ListStorage);
    });
  }

  saveTodoList() {
    localStorage.setItem('todoLISTStorage', JSON.stringify(this.ListStorage));
  }

  showCurrentLISTS() {
    this.ListStorage.forEach((todoLIST) => {
      const todoListObject = new TodoList(this.itemsStorage);
      this.todoLISTS[todoLIST.id] = todoListObject;
    });
  }
  deleteTodoLISTEvent() {
    document.addEventListener('deleteLIST', (e) => {
      const elId = e.detail.id;
      const index = this.ListStorage.findIndex(elem => elem.id === elId);
      this.ListStorage.splice(index, 1);
      this.todoLISTS[elId].innerHTML = '';
      delete this.todoLISTS[elId];
      this.saveTodoList();
    });
  }

  /*  deleteTodoItemEvent() {
      document.addEventListener('deleteItem', (e) => {
        const elId = e.detail.id;
        const index = this.itemsStorage.findIndex(elem => elem.id === elId);
        this.itemsStorage.splice(index, 1);
        this.todoItems[elId].deleteItem();
        delete this.todoItems[elId];
        this.saveTodoItem();
      });
    } */

}

// localStorage.removeItem(todo-list${todoList.id});
