export default class todoItem {

  constructor(inputPush, buttonPush, todoListPush, itemsStoragePush, idPush, removeListPush, deleteItemPush) {
    this.button = buttonPush;
    this.inputPush = inputPush;
    this.todoList = todoListPush;
    this.itemsStorage = itemsStoragePush;
    this.removeList = removeListPush;
    this.id = idPush;
    this.deleteItem = deleteItemPush;
    this.remove;
    this.createEntry();
    this.addTodoItem();
    this.removeEvent();
    this.removeTodoItem();
    //  this.toggleDone();
  }

  // создание одной записи в лист
  createEntry() {
    this.todoList.innerHTML = this.itemsStorage.map((item, i) => `<li class="list-content">
                  <input class="one-list-item" type="text" for="todo${i}" value="${item.title}">            
                  <input type="checkbox" class="checkDone" id="todo${i}" data-index="${i}" ${item.done ? 'checked' : ''} />
                  <span id="delete" class="delete" data-index="${i}">X</span>
           </li>`).join('');
  }

  // добавление одной записи в лист
  addTodoItem() {
    if (this.inputPush.value.length === 0) return;
    const title = this.inputPush.value;
    const todo = {
      title,
      done: false,
      id: this.id,
    };
    this.itemsStorage.push(todo);
    //  console.log(this.itemsStorage);
    this.saveTodoItem();
  }
  /*
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
    } */

  // сохранение одной записи в лист
  saveTodoItem() {
    localStorage.setItem('todo-list', JSON.stringify(this.itemsStorage));
    this.createEntry();
  }

  // очистить список и удалить все записи
  clearList() {
    this.itemsStorage = [];
    localStorage.removeItem('todo-list');
    this.createEntry(this.itemsStorage, this.todoList);
    this.removeList.classList.add('hidden');
  }

  removeTodoItem() {
    this.todoList.addEventListener('click', (e) => {

      if (!e.target.matches('.delete')) return;
      e.dispatchEvent(this.deleteItem);
      this.saveTodoItem();
      /*  const el = e.target;
        const index = el.dataset.index;
        this.itemsStorage.splice(index, 1);
        this.saveTodoItem();*/
    });
  }

  /* removeTodoItem() {
     this.todoList.addEventListener('click', (e) => {
       if (!e.target.matches('.delete')) return;
       const el = e.target;
       //  this.itemsStorage.splice(index, 1);
       el.dispatchEvent(this.deleteItemPush);
       //    console.log(this.itemsStorage);
       this.saveTodoItem();
     });
   } */

  // удалить записи по клику на кнопку
  removeEvent() {
    this.removeList.addEventListener('click', () => {
      this.clearList();
      //   this.removeList.dispatchEvent(this.deleteItemPush);
    });
  }

  // найти по айди, получить объект, поменять false на true 
}

/*
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
