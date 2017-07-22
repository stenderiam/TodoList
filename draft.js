/*
   const el = e.target;
          const elemWithId = this.itemsStorage.find(elem => elem.id === el);
          console.log(elemWithId);
          this.itemsStorage.splice(elemWithId, 1);
    deleteEventListen() {
      const deleteEvent = new CustomEvent('deleteItem', {
        detail: { id: 'id' },
      });
      deleteEvent.addEventListener('deleteItem', (e) => {
        const el = e.target;
        const elemWithId = this.itemsStorage.find(elem => elem.id === el);
        console.log(elemWithId);
        this.itemsStorage.splice(elemWithId, 1);
      });
    }
     
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

===============================================================

/*
   // очистить список и удалить все записи
   clearList() {
      this.itemsStorage = [];
      localStorage.removeItem('todo-list');
      this.createEntry(this.itemsStorage, this.todoList);
      this.removeList.classList.add('hidden');
    }
   if (!e.target.matches('.delete')) return;
    this.parent.parentNode.dispatchEvent(this.deleteItem);
    this.saveTodoItem();
      const el = e.target;
      const index = el.dataset.index;
      this.itemsStorage.splice(index, 1);
      this.saveTodoItem();
    toggleDone() {
      this.todoList.addEventListener('click', (e) => {
        if (!e.target.matches('.checkDone')) return;
        const elemWithId10 = this.itemsStorage.find(elem => elem.id === 3);
        console.log(elemWithId10);
        /  const el = e.target;
           const index = el.dataset.index;
           this.itemsStorage[index].done = !this.itemsStorage[index].done;
        this.saveTodoItem();
      });
    }





   export default class ToDoListItem {

  constructor(btnPush, inputPush, todoListPush, todoFormPush, removeListPush, itemsStoragePush, taskCounterPush) {
    this.btn = btnPush;
    //  this.showListEvent = showList;
    this.input = inputPush;
    this.todoList = todoListPush;
    this.todoForm = todoFormPush;
    this.removeList = removeListPush;
    this.itemsStorage = itemsStoragePush;
    this.counter = taskCounterPush;
    //  this.del = document.getElementById('delete');
    // this.createList(this.itemsStorage, this.todoList);
    this.addTodoItem();
    this.toggleDone();
    this.removeTodoItem();
    this.removeEvent();
  }

  addTodoItem() {
    if (this.input.value.length === 0) return;
    const title = this.input.value;
    //  let setId = this.counter;
    const todo = {
      title,
      done: false,
      id: this.counter,
    };
    this.itemsStorage.push(todo);
    console.log(this.itemsStorage);
    this.saveTodoItem();
  }



  saveTodoItem() {
    // storage.setItem(keyName, keyValue);
    localStorage.setItem('todo-list', JSON.stringify(this.itemsStorage));
    this.createList(this.itemsStorage, this.todoList);
    // this.showRemoveButton();
  }

  createList(list = [], listTarget) {
    listTarget.innerHTML = list.map((item, i) => `<li class="list-content">
                  <input class="one-list-item" type="text" for="todo${i}" value="${item.title}">
                  <input type="checkbox" class="checkDone" id="todo${i}" data-index="${i}" ${item.done ? 'checked' : ''} />
                  <span id="delete" class="delete" data-index="${i}">X</span>
           </li>`).join('');
  }

  toggleDone() {
    this.todoList.addEventListener('click', (e) => {
      if (!e.target.matches('.checkDone')) return;
      const el = e.target;
      const index = el.dataset.index;
      this.itemsStorage[index].done = !this.itemsStorage[index].done;
      this.saveTodoItem();
    });
  }

  removeTodoItem() {
    // console.log('aaa');
    this.todoList.addEventListener('click', (e) => {
      if (!e.target.matches('.delete')) return;
      const el = e.target;
      const index = el.dataset.index;
      // array.splice(start, deleteCount)
      this.itemsStorage.splice(index, 1);

      // check an array

      console.log(this.itemsStorage);
      this.saveTodoItem();
    });

    if (this.itemsStorage.length === 0) {
      this.removeData();
      this.removeList.classList.add('hidden');
    }
  }

  showRemoveButton() {
    if (this.itemsStorage.length > 1) return;
    this.removeList.classList.remove('hidden');
  }

  removeData() {
    // clean an object array
    this.itemsStorage = [];
    localStorage.removeItem('todo-list');
    this.createList(this.itemsStorage, this.todoList);
    this.removeList.classList.add('hidden');
  }

  removeEvent() {
    this.removeList.addEventListener('click', () => {
      this.removeData();
    });
  }
}

*/
