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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e60f38e74c9d61ddff9d840dd9ce10fb.svg";

/***/ })
]);
//# sourceMappingURL=2.bundle.js.map