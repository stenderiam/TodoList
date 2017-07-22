(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _todolist = require('./todolist.js');

var _todolist2 = _interopRequireDefault(_todolist);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// const todoList = document.querySelector('.todo-list');

/* const itemsStorage = JSON.parse(localStorage.getItem('todo-list')) || [
  {
    title: 'Duplicate door key',
    done: false,
  },
  {
    title: 'Boom Shka lak',
    done: true,
  },
]; */

// const inputTest = document.querySelector('.myinput');
// const btn = document.querySelector('.button');

var layout = '\n       <div class="todoList-container"> \n          <div id="add-todo">\n            <form class="add-todo">\n                <input class="myinput" type="text" placeholder="Don\'t Forget to..." name="item" required>\n                <input class="button" type="submit" value="+">\n            </form>\n        </div>\n          <ul class="todo-list"></ul>\n          <div class="remove-List">Remove All</div>\n        </div>\n    ';
var itemsStorage = JSON.parse(localStorage.getItem('todo-list')) || [];
var first = new _todolist2.default(layout, itemsStorage);
// const second = new ToDoList(layout);

},{"./todolist.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _todolistitem = require('./todolistitem.js');

var _todolistitem2 = _interopRequireDefault(_todolistitem);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

// import itemsStorage from "./localStorage.js";

var ToDoList = function () {
  function ToDoList(layout, itemsStorage) {
    _classCallCheck(this, ToDoList);

    // создание контейнера для todo list
    this.layout = document.querySelector('.cntr');
    this.layout.insertAdjacentHTML('beforeend', layout);
    // получение данных для компановки todo list
    this.inputID = document.querySelector('.myinput');
    this.buttonID = document.querySelector('.button');
    this.todoList = document.querySelector('.todo-list');
    this.removeList = document.querySelector('.remove-List');
    this.itemsStorage = itemsStorage;
    this.id = 0;
    this.itemsArray = [];
    this.init();
  }

  _createClass(ToDoList, [{
    key: 'init',
    value: function init() {
      this.showCurrentList();
      this.createTodoItem();
      this.deleteEventListen();
      this.clearListEvent();
      this.saveItemEventListen();
    }

    // создать новую запись по клику на кнопку

  }, {
    key: 'createTodoItem',
    value: function createTodoItem() {
      var _this = this;

      this.buttonID.addEventListener('click', function (e) {
        e.preventDefault();
        if (_this.inputID.value.length === 0) return;
        var title = _this.inputID.value;
        var maxId = Math.max.apply(Math, _this.itemsStorage.map(function (elem) {
          return elem.id;
        }));
        var todo = {
          title: title,
          done: false,
          id: maxId + 1
        };
        _this.itemsStorage.push(todo);
        new _todolistitem2.default(_this.inputID, _this.buttonID, _this.todoList, _this.itemsStorage, _this.removeList, todo);
        //  console.log(this.inputID);
      });
    }
    // показать при старте все записи листа

  }, {
    key: 'showCurrentList',
    value: function showCurrentList() {
      var _this2 = this;

      this.itemsStorage.forEach(function (elem) {
        _this2.itemsArray.push(new _todolistitem2.default(_this2.inputID, _this2.buttonID, _this2.todoList, _this2.itemsStorage, _this2.removeList, elem));
      });
    }
    // удалить одну запись

  }, {
    key: 'deleteEventListen',
    value: function deleteEventListen() {
      var _this3 = this;

      document.addEventListener('deleteItem', function (e) {
        var el = e.target;
        var elemWithId = _this3.itemsStorage.findIndex(function (elem) {
          return elem.id === el;
        });
        console.log(elemWithId);
        _this3.itemsStorage.splice(elemWithId, 1);
        _this3.saveItem();
      });
    }

    // сохранить в localStorage

  }, {
    key: 'saveItemEventListen',
    value: function saveItemEventListen() {
      var _this4 = this;

      document.addEventListener('saveItem', function (e) {
        _this4.saveItem();
      });
    }
  }, {
    key: 'saveItem',
    value: function saveItem() {
      localStorage.setItem('todo-list', JSON.stringify(this.itemsStorage));
    }
  }, {
    key: 'clearList',
    value: function clearList() {
      this.itemsStorage = [];
      this.itemsArray = [];
      localStorage.removeItem('todo-list');
      this.todoList.innerHTML = '';
      this.removeList.classList.add('hidden');
    }
    // удалить записи по клику на кнопку

  }, {
    key: 'clearListEvent',
    value: function clearListEvent() {
      var _this5 = this;

      this.removeList.addEventListener('click', function () {
        _this5.clearList();
      });
    }
  }]);

  return ToDoList;
}();

exports.default = ToDoList;

},{"./todolistitem.js":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var todoItem = function () {
  function todoItem(inputPush, buttonPush, todoListPush, itemsStoragePush, removeList, elem) {
    _classCallCheck(this, todoItem);

    this.button = buttonPush;
    this.elem = elem;
    this.inputPush = inputPush;
    this.todoList = todoListPush;
    this.itemsStorage = itemsStoragePush;
    // this.deleteBtn = document.querySelector('.delete');
    this.removeList = removeList;
    this.deleteItemEvent = new CustomEvent('deleteItem', {
      detail: { id: this.id }
    });
    this.saveItemEvent = new CustomEvent('saveItem', {
      detail: { id: this.id }
    });
    //   this.addTodoItem();
    this.saveTodoItem();
    this.createEntry();
    this.removeTodoItem();
  }
  // создание одной записи в лист


  _createClass(todoItem, [{
    key: 'createEntry',
    value: function createEntry() {
      var elemCreate = this.elem;
      var elemLi = document.createElement('li');
      elemLi.className = 'list-content';
      this.todoList.appendChild(elemLi);
      var elemHtml = '<input class="one-list-item" type="text" for="todo' + this.id + '" value="' + elemCreate.title + '">            \n                  <input type="checkbox" class="checkDone" id="todo' + this.id + '" data-index="' + this.id + '" ' + (elemCreate.done ? 'checked' : '') + ' />\n                  <span id="delete" class="delete" data-index="' + this.id + '">X</span>';
      elemLi.innerHTML = elemHtml;
    }

    // добавление одной записи в лист
    /* addTodoItem() {
       if (this.inputPush.value.length === 0) return;
       const title = this.inputPush.value;
       const maxId = Math.max.apply(Math, this.itemsStorage.map((elem) => { return elem.id; }));
       const todo = {
         title,
         done: false,
         id: maxId,
       };
       this.itemsStorage.push(todo);
       console.log(this.itemsStorage);
       } */
    // сохранение одной записи в лист

  }, {
    key: 'saveTodoItem',
    value: function saveTodoItem() {
      var _this = this;

      this.button.addEventListener('click', function () {
        document.dispatchEvent(_this.saveItemEvent);
        _this.createEntry();
      });
    }
  }, {
    key: 'removeTodoItem',
    value: function removeTodoItem() {
      var _this2 = this;

      this.todoList.addEventListener('click', function (e) {
        if (!e.target.matches('.delete')) return;
        // this.deleteItemEvent.detail.id = this.id;
        document.dispatchEvent(_this2.deleteItemEvent);
        //  console.log('item', e);
      });
    }
  }]);

  return todoItem;
}();

exports.default = todoItem;

},{}]},{},[1]);
