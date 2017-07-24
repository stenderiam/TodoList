export default class TodoListItem {

  constructor(todoList, todoListContainer, elem) {
    this.elem = elem;
    this.todoList = todoList;
    this.parentContainer = todoListContainer;
    this.itemCustomEvent();
    this.createEntry();
    this.removeItemEvent();
    this.inputUpdateEvent();
    this.checkboxUpdateEvent();
  }
  itemCustomEvent() {
    this.deleteItemEvent = new CustomEvent('deleteItem', {
      detail: { id: this.elem.id },
    });
    this.updateItemEvent = new CustomEvent('updateItem', {
      detail: {},
    });
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
      this.parentContainer.dispatchEvent(this.updateItemEvent);
    });
  }
  checkboxUpdateEvent() {
    this.checkboxElem.addEventListener('change', () => {
      this.updateItemEvent.detail.elem = Object.assign({}, this.elem, { done: this.checkboxElem.checked });
      this.parentContainer.dispatchEvent(this.updateItemEvent);
    });
  }
  removeItemEvent() {
    this.deleteButton.addEventListener('click', () => {
      this.parentContainer.dispatchEvent(this.deleteItemEvent);
    });
  }
}
