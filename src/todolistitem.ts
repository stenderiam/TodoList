let deletesvg = require('../icons/deletesvg.svg');

import ItodoItemType from './ItodoItemType';

export default class TodoListItem {

  elem: ItodoItemType;
  todoList: HTMLUListElement;
  parentContainer: HTMLElement;
  elemLi: HTMLLIElement;
  checkboxElem: HTMLInputElement;
  inputElem: HTMLInputElement;
  deleteButton: HTMLButtonElement;
  deleteItemEvent: CustomEvent;
  updateItemEvent: CustomEvent;

  constructor(todoList: HTMLUListElement, todoListContainer: HTMLElement, elem: ItodoItemType) {
    this.elem = elem;
    this.todoList = todoList;
    this.parentContainer = todoListContainer;
    this.itemCustomEvent();
    this.createEntry();
    this.removeItemEvent();
    this.inputUpdateEvent();
    this.checkboxUpdateEvent();
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
  inputUpdateEvent() {
    this.inputElem.addEventListener('change', () => {
      this.updateItemEvent.detail.elem = Object.assign({}, this.elem, { title: this.inputElem.value });
      this.parentContainer.dispatchEvent(this.updateItemEvent);
    });
  }
  checkboxUpdateEvent() {
    this.checkboxElem.addEventListener('change', () => {
      this.updateItemEvent.detail.elem = Object.assign({}, this.elem, { done: this.checkboxElem.checked });
      this.isDone();
      this.parentContainer.dispatchEvent(this.updateItemEvent);
    });
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
      this.parentContainer.dispatchEvent(this.deleteItemEvent);
    });
  }
}
