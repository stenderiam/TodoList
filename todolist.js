
import todoItem from "./todolistitem.js";
import itemsStorage from "./localStorage.js";

export default class ToDoList {

  constructor(layout) {
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
    this.listArray = [];
    this.deleteItem;
    this.init();
  }


  init() {
    this.showCurrentList();
    this.createTodoItem();

    this.deleteEventListen()
  }

  // создать новую запись по клику на кнопку
  createTodoItem() {
    this.buttonID.addEventListener('click', (e) => {
      e.preventDefault();
      new todoItem(this.inputID, this.buttonID, this.todoList, this.itemsStorage, this.id++, this.removeList);
      //  console.log(this.inputID);
    });
  }

  // показать при старте все записи листа
  showCurrentList() {
    this.itemsStorage.forEach(() => {
      this.listArray.push(new todoItem(this.inputID, this.buttonID, this.todoList, this.itemsStorage, this.id++, this.removeList, this.deleteItem));
    });
  }

  customDeleteEvent() {
    this.deleteItem = new CustomEvent('deleteItem', {
      detail: { id: 'id' },
    });
  }

  deleteEventListen() {
    this.deleteItem.addEventListener('deleteItem', () => {
      //    this.customDeleteEvent();
      //     console.log('done');
      const el = e.target;
      this.itemsStorage.splice(index, 1);
    });
  }




}



/*

  constructor(inputTest, btn) {
    //  this.todoList = todoList;
    //  this.todoForm = todoForm;
    // this.removeList = removeList;
    // this.itemsStorage = itemsStorage;
    this.btn = btn;
    this.taskCounter = 0;
    this.inputTest = inputTest;
    this.todoForm = document.querySelector('.add-todo');
    this.removeList = document.querySelector('.remove-List');
    this.todoList = document.querySelector('.todo-list');
    // this.del = document.getElementById('delete');
    this.itemsStorage = JSON.parse(localStorage.getItem('todo-list')) || [
      {
        title: 'Duplicate door key',
        done: false,
        //  id: 0,
      },
      {
        title: 'Boom Shka lak',
        done: true,
      },
    ];
    this.init();
  }

  init() {
    this.handler();
    //  this.customHangler();
    //  this.showList();
  }

  showList() {
    // storage.setItem(keyName, keyValue);
    localStorage.setItem('todo-list', JSON.stringify(this.itemsStorage));
    this.createList(this.itemsStorage, this.todoList);
    // this.showRemoveButton();
    console.log(this.itemsStorage);
  }

 createList(list = [], listTarget) {
   listTarget.innerHTML = list.map((item, i) => `<li class="list-content">
                 <input class="one-list-item" type="text" for="todo${i}" value="${item.title}">
                 <input type="checkbox" class="checkDone" id="todo${i}" data-index="${i}" ${item.done ? 'checked' : ''} />
                 <span id="delete" class="delete" data-index="${i}">X</span>
          </li>`).join('');
 }

 customHangler() {
   this.showList = new CustomEvent('showList', {
     detail: {
       count: 'done',
     },
   });
   this.input.parentNode.addEventListener('showList', (event) => {
     this.createList(this.itemsStorage, this.todoList);
   });
 }

handler() {
  this.btn.addEventListener('click', (e) => {
    e.preventDefault();
    new ToDoListItem(this.btn, this.inputTest, this.todoList, this.todoForm, this.removeList, this.itemsStorage, this.taskCounter++);
  });
}

}
*/
