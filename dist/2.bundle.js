webpackJsonp([2,1],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var deletesvg = __webpack_require__(1);
var TodoListItem = (function () {
    function TodoListItem(todoList, todoListContainer, elem) {
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
    TodoListItem.prototype.itemCustomEvent = function () {
        this.deleteItemEvent = new CustomEvent('deleteItem', {
            detail: { id: this.elem.id },
        });
        this.updateItemEvent = new CustomEvent('updateItem', {
            detail: {},
        });
    };
    TodoListItem.prototype.createEntry = function () {
        this.createElemLi();
        this.createElemCheckbox();
        this.createElemDeleteButton();
        this.createElemInput();
        this.elemLi.appendChild(this.checkboxElem);
        this.elemLi.appendChild(this.inputElem);
        this.elemLi.appendChild(this.deleteButton);
        this.todoList.appendChild(this.elemLi);
    };
    TodoListItem.prototype.createElemLi = function () {
        this.elemLi = document.createElement('li');
        this.elemLi.className = 'list-item ';
    };
    TodoListItem.prototype.createElemCheckbox = function () {
        this.checkItem = document.createElement('div');
        this.checkItem.className = 'item-input';
        this.checkboxElem = document.createElement('input');
        this.checkboxElem.className = 'item-checkbox';
        this.checkboxElem.type = 'checkbox';
        this.checkItem.appendChild(this.checkboxElem);
        this.checkboxElem.id = "todo" + this.elem.id;
        this.checkboxElem.checked = this.elem.done;
    };
    TodoListItem.prototype.createElemDeleteButton = function () {
        this.deleteDiv = document.createElement('div');
        this.deleteDiv.className = 'item-buttonn';
        this.deleteButton = document.createElement('button');
        this.deleteButton.type = 'button';
        this.deleteButton.className = 'item-delete';
        this.deleteDiv.appendChild(this.deleteButton);
        this.deleteButton.innerHTML = "<img src=\"" + deletesvg + "\" alt= \"delete icon\" > ";
    };
    TodoListItem.prototype.createElemInput = function () {
        this.inputItem = document.createElement('div');
        this.inputItem.className = 'item-text';
        this.inputElem = document.createElement('input');
        this.inputElem.className = 'item-input--tag';
        this.inputElem.type = 'text';
        this.inputElem.value = this.elem.title;
    };
    TodoListItem.prototype.deleteItem = function () {
        this.elemLi.remove();
    };
    TodoListItem.prototype.inputUpdateEvent = function () {
        var _this = this;
        this.inputElem.addEventListener('change', function () {
            _this.updateItemEvent.detail.elem = Object.assign({}, _this.elem, { title: _this.inputElem.value });
            _this.parentContainer.dispatchEvent(_this.updateItemEvent);
        });
    };
    TodoListItem.prototype.checkboxUpdateEvent = function () {
        var _this = this;
        this.checkboxElem.addEventListener('change', function () {
            _this.updateItemEvent.detail.elem = Object.assign({}, _this.elem, { done: _this.checkboxElem.checked });
            _this.isDone();
            _this.parentContainer.dispatchEvent(_this.updateItemEvent);
        });
    };
    TodoListItem.prototype.isDone = function () {
        if (this.checkboxElem.checked) {
            this.inputElem.classList.add('task-isDone');
        }
        else {
            this.inputElem.classList.remove('task-isDone');
        }
    };
    TodoListItem.prototype.removeItemEvent = function () {
        var _this = this;
        this.deleteButton.addEventListener('click', function () {
            _this.parentContainer.dispatchEvent(_this.deleteItemEvent);
        });
    };
    return TodoListItem;
}());
exports.default = TodoListItem;
/*
let deletesvg = require('../icons/deletesvg.svg');

interface ItodoItemType {
  title?: string,
  done?: boolean,
  id: number
}

export default class TodoListItem {

  elem: ItodoItemType;
  todoList: Element;
  parentContainer: HTMLElement;
  elemLi: HTMLElement;
  checkboxElem: HTMLInputElement;
  deleteButton: HTMLButtonElement;
  inputElem: HTMLInputElement;


  deleteItemEvent: CustomEvent;
  updateItemEvent: CustomEvent;
  // detail: any;

  constructor(todoList, todoListContainer, elem) {
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
    this.createElemLi();
    this.createElemCheckbox();
    this.createElemDeleteButton();
    this.createElemInput();
    this.elemLi.appendChild(this.checkboxElem);
    this.elemLi.appendChild(this.inputElem);
    this.elemLi.appendChild(this.deleteButton);
    this.todoList.appendChild(this.elemLi);
  }

  createElemLi() {
    // this.elemLi = document.createElement('li');
    //  this.elemLi.className = 'list-item ';
    let elemLi: HTMLElement = document.createElement('div');
    elemLi.className = 'list-item ';
    this.elemLi = elemLi;
  }
  createElemCheckbox() {
    let checkItem: HTMLElement = document.createElement('div');
    checkItem.className = 'item-input';
    let checkboxElem: HTMLInputElement = document.createElement('input');
    checkboxElem.className = 'item-checkbox';
    checkboxElem.type = 'checkbox';
    checkItem.appendChild(checkboxElem);
    checkboxElem.id = `todo${this.elem.id } `;
    checkboxElem.checked = this.elem.done;
    this.checkboxElem = checkboxElem;
  }
  createElemDeleteButton() {
    let deleteDiv: HTMLElement = document.createElement('div');
    deleteDiv.className = 'item-buttonn';
    let deleteButton: HTMLButtonElement = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'item-delete';
    deleteDiv.appendChild(deleteButton);

    deleteButton.innerHTML = ` < img src= "${deletesvg}" alt= "delete icon" > `;
    this.deleteButton = deleteButton;
  }
  createElemInput() {
    let inputItem: HTMLElement = document.createElement('div');
    inputItem.className = 'item-text';
    let inputElem: HTMLInputElement = document.createElement('input');
    inputElem.className = 'item-input--tag';
    inputElem.type = 'text';
    inputElem.value = this.elem.title;
    this.inputElem = inputElem;
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

*/ 


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e60f38e74c9d61ddff9d840dd9ce10fb.svg";

/***/ })
]);
//# sourceMappingURL=2.bundle.js.map