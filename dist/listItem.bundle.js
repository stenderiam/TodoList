/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TodoListItem = (function () {
    // detail: any;
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
        // this.elemLi = document.createElement('li');
        //  this.elemLi.className = 'list-item ';
        var elemLi = document.createElement('div');
        elemLi.className = 'list-item ';
        this.elemLi = elemLi;
    };
    TodoListItem.prototype.createElemCheckbox = function () {
        var checkItem = document.createElement('div');
        checkItem.className = 'item-input';
        var checkboxElem = document.createElement('input');
        checkboxElem.className = 'item-checkbox';
        checkboxElem.type = 'checkbox';
        checkItem.appendChild(checkboxElem);
        checkboxElem.id = "todo" + this.elem.id;
        checkboxElem.checked = this.elem.done;
        this.checkboxElem = checkboxElem;
        /* this.checkItem = document.createElement('div');
           this.checkItem.className = 'item-input';
           this.checkboxElem = document.createElement('input');
           this.checkboxElem.className = 'item-checkbox';
           this.checkboxElem.type = 'checkbox';
           this.checkItem.appendChild(this.checkboxElem);
           this.checkboxElem.id = `todo${this.elem.id}`;
           this.checkboxElem.checked = this.elem.done; */
    };
    TodoListItem.prototype.createElemDeleteButton = function () {
        var deleteDiv = document.createElement('div');
        deleteDiv.className = 'item-buttonn';
        var deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'item-delete';
        deleteDiv.appendChild(deleteButton);
        deleteButton.innerHTML = " <img class=\"delete-img\" alt=\"delete icon\">";
        this.deleteButton = deleteButton;
        /*  this.deleteDiv = document.createElement('div');
          this.deleteDiv.className = 'item-buttonn';
          this.deleteButton = document.createElement('button');
          this.deleteButton.type = 'button';
          this.deleteButton.className = 'item-delete';
          this.deleteDiv.appendChild(this.deleteButton);
          this.deleteButton.innerHTML = ` <img src="../icons/delete.svg" alt="delete icon">`; */
    };
    TodoListItem.prototype.createElemInput = function () {
        var inputItem = document.createElement('div');
        inputItem.className = 'item-text';
        var inputElem = document.createElement('input');
        inputElem.className = 'item-input--tag';
        inputElem.type = 'text';
        inputElem.value = this.elem.title;
        this.inputElem = inputElem;
        /* this.inputItem = document.createElement('div');
         this.inputItem.className = 'item-text';
         this.inputElem = document.createElement('input');
         this.inputElem.className = 'item-input--tag';
         this.inputElem.type = 'text';
         this.inputElem.value = this.elem.title; */
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


/***/ })
/******/ ]);
//# sourceMappingURL=listItem.bundle.js.map