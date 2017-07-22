export default class todoItem {

  constructor(inputPush, buttonPush, todoListPush, itemsStoragePush, idPush) {
    this.button = buttonPush;
    this.inputPush = inputPush;
    this.todoList = todoListPush;
    this.itemsStorage = itemsStoragePush;
    // this.deleteBtn = document.querySelector('.delete');
    this.id = idPush;
    this.deleteEvent = new CustomEvent('deleteItem', {
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
    //  console.log(this.itemsStorage);
    this.saveTodoItem();
  }
  // сохранение одной записи в лист
  saveTodoItem() {
    localStorage.setItem('todo-list', JSON.stringify(this.itemsStorage));
    this.createEntry();
  }
  removeTodoItem() {
    this.todoList.addEventListener('click', (e) => {
      if (!e.target.matches('.delete')) return;
      document.dispatchEvent(this.deleteEvent);
      //  console.log('item', e);
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
  /*
    removeEvent() {
      this.removeList.addEventListener('click', () => {
        //   this.clearList();
        document.dispatchEvent(this.deleteList);
      });
    } */
}
