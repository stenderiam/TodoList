let deletesvg = require('../icons/deletesvg.svg');

import ItodoItemType from './ItodoItemType';

export default class TodoListItem {

  elem: ItodoItemType;
  todoList: HTMLUListElement;
  elemLi: HTMLLIElement;
  checkboxElem: HTMLInputElement;
  inputElem: HTMLInputElement;
  deleteButton: HTMLButtonElement;
  deleteItemEvent: CustomEvent;
  updateItemEvent: CustomEvent;

  constructor(todoList: HTMLUListElement, elem: ItodoItemType) {
    this.elem = elem;
    this.todoList = todoList;
    this.itemCustomEvent();
    this.createEntry();
    this.removeItemEvent();
    this.checkHandler = this.checkHandler.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    this.initUpdateEvents();
    this.isDone();
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
    this.elemLi = this.createElemLi();
    this.checkboxElem = this.createElemCheckbox(this.elem);
    this.deleteButton = this.createElemDeleteButton();
    this.inputElem = this.createElemInput(this.elem);
    this.elemLi.appendChild(this.checkboxElem);
    this.elemLi.appendChild(this.inputElem);
    this.elemLi.appendChild(this.deleteButton);
    this.todoList.appendChild(this.elemLi);
  }

  createElemLi(): HTMLLIElement {
    let elemLiItem = document.createElement('li');
    elemLiItem.className = 'list-item ';
    return elemLiItem;
  }

  createElemCheckbox(elem: ItodoItemType): HTMLInputElement {
    let checkItemDiv: HTMLElement = document.createElement('div');
    checkItemDiv.className = 'item-input';
    let elemCheckboxItem = document.createElement('input');
    elemCheckboxItem.className = 'item-checkbox';
    elemCheckboxItem.type = 'checkbox';
    checkItemDiv.appendChild(elemCheckboxItem);
    elemCheckboxItem.id = `todo${elem.id}`;
    elemCheckboxItem.checked = elem.done;
    return elemCheckboxItem;
  }

  createElemDeleteButton(): HTMLButtonElement {
    let elemDeleteDiv: HTMLElement = document.createElement('div');
    elemDeleteDiv.className = 'item-buttonn';
    let elemDeleteButton = document.createElement('button');
    elemDeleteButton.type = 'button';
    elemDeleteButton.className = 'item-delete';
    elemDeleteButton.innerHTML = `<img src="${deletesvg}" alt= "delete icon" > `;
    elemDeleteDiv.appendChild(elemDeleteButton);
    return elemDeleteButton;
  }
  createElemInput(elem: ItodoItemType): HTMLInputElement {
    let elemInputDiv: HTMLElement = document.createElement('div');
    elemInputDiv.className = 'item-text';
    let elemInput = document.createElement('input');
    elemInput.className = 'item-input--tag';
    elemInput.type = 'text';
    elemInput.value = elem.title;
    return elemInput;
  }
  deleteItem() {
    this.elemLi.remove();
  }

  initUpdateEvents() {
    this.checkboxElem.addEventListener('change', this.checkHandler);
    this.inputElem.addEventListener('change', this.inputHandler);
  }
  checkHandler(e) {
    this.updateItemEvent.detail.elem = Object.assign({}, this.elem, { done: this.checkboxElem.checked });
    this.isDone();
    this.todoList.dispatchEvent(this.updateItemEvent);
  }
  inputHandler(e) {
    this.updateItemEvent.detail.elem = Object.assign({}, this.elem, { title: this.inputElem.value });
    this.todoList.dispatchEvent(this.updateItemEvent);
  }

  isDone() {
    if (this.checkboxElem.checked) {
      this.inputElem.classList.add('task-isDone');
    } else {
      this.inputElem.classList.remove('task-isDone');
    }
  }
  removeItemEvent() {
    this.deleteButton.addEventListener('click', () => {
      this.todoList.dispatchEvent(this.deleteItemEvent);
    });
  }
}
