export default class todoItem {

  constructor(inputPush, buttonPush, todoListPush, itemsStoragePush, idPush, removeList) {
    this.button = buttonPush;
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
    this.addTodoItem();
    this.createEntry();
    this.removeTodoItem();
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
    console.log(this.itemsStorage);
    this.saveTodoItem();
  }
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
