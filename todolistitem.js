export default class todoItem {

  constructor(inputPush, buttonPush, todoListPush, itemsStoragePush, removeList, elem) {
    this.button = buttonPush;
    this.elem = elem;
    this.inputPush = inputPush;
    this.todoList = todoListPush;
    this.itemsStorage = itemsStoragePush;
    // this.deleteBtn = document.querySelector('.delete');
    this.removeList = removeList;
    this.deleteItemEvent = new CustomEvent('deleteItem', {
      detail: { id: this.elem.id },
    });
    this.saveItemEvent = new CustomEvent('saveItem', {
      detail: { id: this.elem.id },
    });
    //   this.addTodoItem();
    // this.saveTodoItem();

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
                  <input type="checkbox" class="checkDone" id="todo${this.id}" data-index="${this.id}" ${elemCreate.done ? 'checked' : ''} /> `;
    elemLi.innerHTML = elemHtml;
    const deleteButton = document.createElement('div');
    deleteButton.className = 'delete';
    deleteButton.innerHTML = '<span>X</span>';
    elemLi.appendChild(deleteButton);
    this.elemLi = elemLi;
    this.deleteButton = deleteButton;
  }
  deleteItem() {
    this.elemLi.remove();
  }
  removeTodoItem() {
    this.deleteButton.addEventListener('click', () => {
      //   if (!e.target.matches('.delete')) return;
      // this.deleteItemEvent.detail.id = this.id;

      document.dispatchEvent(this.deleteItemEvent);
      // this.deleteItem();
      //  console.log('item', e);
    });
  }
}
