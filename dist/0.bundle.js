webpackJsonp([0,2],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var deletesvg = __webpack_require__(3);
var TodoListItem = (function () {
    function TodoListItem(todoList, elem) {
        this.elem = elem;
        this.todoList = todoList;
        //  this.parentContainer = todoListContainer;
        this.itemCustomEvent();
        this.createEntry();
        this.removeItemEvent();
        //  this.inputUpdateEvent();
        //   this.checkboxUpdateEvent();
        this.checkHandler = this.checkHandler.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
        //this.onRemove = this.onRemove.bind(this); 
        this.createEntryEvents();
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
        this.elemLi = this.createElemLi();
        this.checkboxElem = this.createElemCheckbox(this.elem);
        this.deleteButton = this.createElemDeleteButton();
        this.inputElem = this.createElemInput(this.elem);
        this.elemLi.appendChild(this.checkboxElem);
        this.elemLi.appendChild(this.inputElem);
        this.elemLi.appendChild(this.deleteButton);
        this.todoList.appendChild(this.elemLi);
    };
    TodoListItem.prototype.createElemLi = function () {
        var elemLiItem = document.createElement('li');
        elemLiItem.className = 'list-item ';
        return elemLiItem;
    };
    TodoListItem.prototype.createElemCheckbox = function (elem) {
        var checkItemDiv = document.createElement('div');
        checkItemDiv.className = 'item-input';
        var elemCheckboxItem = document.createElement('input');
        elemCheckboxItem.className = 'item-checkbox';
        elemCheckboxItem.type = 'checkbox';
        checkItemDiv.appendChild(elemCheckboxItem);
        elemCheckboxItem.id = "todo" + elem.id;
        elemCheckboxItem.checked = elem.done;
        return elemCheckboxItem;
    };
    TodoListItem.prototype.createElemDeleteButton = function () {
        var elemDeleteDiv = document.createElement('div');
        elemDeleteDiv.className = 'item-buttonn';
        var elemDeleteButton = document.createElement('button');
        elemDeleteButton.type = 'button';
        elemDeleteButton.className = 'item-delete';
        elemDeleteButton.innerHTML = "<img src=\"" + deletesvg + "\" alt= \"delete icon\" > ";
        elemDeleteDiv.appendChild(elemDeleteButton);
        return elemDeleteButton;
    };
    TodoListItem.prototype.createElemInput = function (elem) {
        var elemInputDiv = document.createElement('div');
        elemInputDiv.className = 'item-text';
        var elemInput = document.createElement('input');
        elemInput.className = 'item-input--tag';
        elemInput.type = 'text';
        elemInput.value = elem.title;
        return elemInput;
    };
    TodoListItem.prototype.deleteItem = function () {
        this.elemLi.remove();
    };
    TodoListItem.prototype.createEntryEvents = function () {
        this.checkboxElem.addEventListener('change', this.checkHandler);
        this.inputElem.addEventListener('change', this.inputHandler);
    };
    TodoListItem.prototype.checkHandler = function (e) {
        this.updateItemEvent.detail.elem = Object.assign({}, this.elem, { done: this.checkboxElem.checked });
        this.isDone();
        this.todoList.dispatchEvent(this.updateItemEvent);
    };
    TodoListItem.prototype.inputHandler = function (e) {
        this.updateItemEvent.detail.elem = Object.assign({}, this.elem, { title: this.inputElem.value });
        this.todoList.dispatchEvent(this.updateItemEvent);
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
            _this.todoList.dispatchEvent(_this.deleteItemEvent);
        });
    };
    return TodoListItem;
}());
exports.default = TodoListItem;


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e60f38e74c9d61ddff9d840dd9ce10fb.svg";

/***/ })
]);
//# sourceMappingURL=0.bundle.js.map