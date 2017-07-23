export default class TodoListItem {

  constructor(inputPush, buttonPush, todoListPush, itemsStoragePush, removeList, elem) {
    this.button = buttonPush;
    this.elem = elem;
    this.inputPush = inputPush;
    this.todoList = todoListPush;
    this.itemsStorage = itemsStoragePush;
    this.removeList = removeList;
    this.deleteItemEvent = new CustomEvent('deleteItem', {
      detail: { id: elem.id },
    });
    this.updateItemEvent = new CustomEvent('updateItem', {
      detail: {},
    });
    this.createEntry();
    this.removeTodoItemEvent();
    this.inputUpdateEvent();
    this.checkboxUpdateEvent();
  }
  createEntry() {
    this.createElemLi();
    this.createElemCheckbox();
    this.createElemDeleteButton();
    this.createElemInput();
    this.elemLi.appendChild(this.inputElem);
    this.elemLi.appendChild(this.checkboxElem);
    this.elemLi.appendChild(this.deleteButton);
    this.todoList.appendChild(this.elemLi);
  }
  createElemLi() {
    this.elemLi = document.createElement('li');
    this.elemLi.className = 'list-content';
  }
  createElemCheckbox() {
    this.checkboxElem = document.createElement('input');
    this.checkboxElem.className = 'checkDone';
    this.checkboxElem.type = 'checkbox';
    this.checkboxElem.id = `todo${this.elem.id}`;
    this.checkboxElem.checked = (!!this.elem.done);
  }
  createElemDeleteButton() {
    this.deleteButton = document.createElement('div');
    this.deleteButton.className = 'delete';
    this.deleteButton.innerHTML = '<span>X</span>';
  }
  createElemInput() {
    this.inputElem = document.createElement('input');
    this.inputElem.className = 'one-list-item';
    this.inputElem.type = 'text';
    this.inputElem.value = this.elem.title;
  }
  deleteItem() {
    this.elemLi.remove();
  }
  inputUpdateEvent() {
    this.inputElem.addEventListener('change', () => {
      this.updateItemEvent.detail.elem = Object.assign({}, this.elem, { title: this.inputElem.value });
      document.dispatchEvent(this.updateItemEvent);
    });
  }
  checkboxUpdateEvent() {
    this.checkboxElem.addEventListener('change', () => {
      this.updateItemEvent.detail.elem = Object.assign({}, this.elem, { done: this.checkboxElem.checked });
      document.dispatchEvent(this.updateItemEvent);
    });
  }
  removeTodoItemEvent() {
    this.deleteButton.addEventListener('click', () => {
      document.dispatchEvent(this.deleteItemEvent);
    });
  }
}
