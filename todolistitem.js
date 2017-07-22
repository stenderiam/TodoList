export default class todoItem {

  constructor(inputPush, buttonPush, todoListPush, itemsStoragePush, idPush, removeList, elem) {
    this.button = buttonPush;
    this.elem = elem;
    this.inputPush = inputPush;
    this.todoList = todoListPush;
    this.itemsStorage = itemsStoragePush;
    // this.deleteBtn = document.querySelector('.delete');
    this.id = idPush;
    this.removeList = removeList;
    this.deleteItemEvent = new CustomEvent('deleteItem', {
      detail: { id: this.id },
    });
    this.saveItemEvent = new CustomEvent('saveItem', {
      detail: { id: this.id },
    });
    //   this.addTodoItem();
    this.saveTodoItem();
    this.createEntry();
    this.removeTodoItem();
  }
  // создание одной записи в лист
  createEntry() {
    const elemCreate = this.elem;
    const elemLi = document.createElement('li');
    elemLi.className = 'list-content';
    this.todoList.appendChild(elemLi);
    const elemHtml = `<input class="one-list-item" type="text" for="todo${this.id}" value="${elemCreate.title}">            
                  <input type="checkbox" class="checkDone" id="todo${this.id}" data-index="${this.id}" ${elemCreate.done ? 'checked' : ''} />
                  <span id="delete" class="delete" data-index="${this.id}">X</span>`;
    elemLi.innerHTML = elemHtml;
  }

  // добавление одной записи в лист
  /* addTodoItem() {
     if (this.inputPush.value.length === 0) return;
     const title = this.inputPush.value;
     const maxId = Math.max.apply(Math, this.itemsStorage.map((elem) => { return elem.id; }));
     const todo = {
       title,
       done: false,
       id: maxId,
     };
     this.itemsStorage.push(todo);
     console.log(this.itemsStorage);
 
   } */
  // сохранение одной записи в лист
  saveTodoItem() {
    this.button.addEventListener('click', () => {
      document.dispatchEvent(this.saveItemEvent);
      this.createEntry();
    });
  }

  removeTodoItem() {
    this.todoList.addEventListener('click', (e) => {
      if (!e.target.matches('.delete')) return;
      // this.deleteItemEvent.detail.id = this.id;
      document.dispatchEvent(this.deleteItemEvent);
      //  console.log('item', e);
    });
  }
}
