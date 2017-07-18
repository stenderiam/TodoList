(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _todolist = require('./todolist.js');

var _todolist2 = _interopRequireDefault(_todolist);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// const ToDoList = require('./todolist.js').default;

function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

var init = function init() {
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

  var inputTest = document.querySelector('.myinput');
  var btn = document.querySelector('.button');

  new _todolist2.default(inputTest, btn);
};
ready(init);

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

// const ToDoListItem = require('./todolistitem.js').default;

var ToDoList = function () {
  function ToDoList(inputTest, btn) {
    _classCallCheck(this, ToDoList);

    //  this.todoList = todoList;
    //  this.todoForm = todoForm;
    // this.removeList = removeList;
    // this.itemsStorage = itemsStorage;
    this.btn = btn;
    this.inputTest = inputTest;
    this.todoForm = document.querySelector('.add-todo');
    this.removeList = document.querySelector('.remove-List');
    this.todoList = document.querySelector('.todo-list');
    // this.del = document.getElementById('delete');
    this.itemsStorage = JSON.parse(localStorage.getItem('todo-list')) || [{
      title: 'Duplicate door key',
      done: false
    }, {
      title: 'Boom Shka lak',
      done: true
    }];
    this.init();
  }

  _createClass(ToDoList, [{
    key: 'init',
    value: function init() {
      this.handler();
      //  this.customHangler();
      //  this.showList();
    }

    /* showList() {
      // storage.setItem(keyName, keyValue);
      localStorage.setItem('todo-list', JSON.stringify(this.itemsStorage));
      this.createList(this.itemsStorage, this.todoList);
      // this.showRemoveButton();
      console.log(this.itemsStorage);
    } */

    /* createList(list = [], listTarget) {
       listTarget.innerHTML = list.map((item, i) => `<li class="list-content">
                     <input class="one-list-item" type="text" for="todo${i}" value="${item.title}">
                     <input type="checkbox" class="checkDone" id="todo${i}" data-index="${i}" ${item.done ? 'checked' : ''} />
                     <span id="delete" class="delete" data-index="${i}">X</span>
              </li>`).join('');
     } */

    /* customHangler() {
       this.showList = new CustomEvent('showList', {
         detail: {
           count: 'done',
         },
       });
         this.input.parentNode.addEventListener('showList', (event) => {
         this.createList(this.itemsStorage, this.todoList);
       });
     } */

  }, {
    key: 'handler',
    value: function handler() {
      var _this = this;

      this.btn.addEventListener('click', function (e) {
        e.preventDefault();
        new _todolistitem2.default(_this.btn, _this.inputTest, _this.todoList, _this.todoForm, _this.removeList, _this.itemsStorage, _this.showList);
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

var ToDoListItem = function () {
  function ToDoListItem(btnPush, inputPush, todoListPush, todoFormPush, removeListPush, itemsStoragePush, showList) {
    _classCallCheck(this, ToDoListItem);

    this.btn = btnPush;
    this.showListEvent = showList;
    this.input = inputPush;
    this.todoList = todoListPush;
    this.todoForm = todoFormPush;
    this.removeList = removeListPush;
    this.itemsStorage = itemsStoragePush;
    //  this.del = document.getElementById('delete');
    // this.createList(this.itemsStorage, this.todoList);
    this.addTodoItem();
    this.toggleDone();
    this.removeTodoItem();
    this.removeEvent();
  }

  _createClass(ToDoListItem, [{
    key: 'addTodoItem',
    value: function addTodoItem() {
      if (this.input.value.length === 0) return;
      var title = this.input.value;
      var todo = {
        title: title,
        done: false
      };
      this.itemsStorage.push(todo);
      this.saveTodoItem();
    }
  }, {
    key: 'saveTodoItem',
    value: function saveTodoItem() {
      // storage.setItem(keyName, keyValue);
      localStorage.setItem('todo-list', JSON.stringify(this.itemsStorage));
      this.createList(this.itemsStorage, this.todoList);
      // this.showRemoveButton();
    }
  }, {
    key: 'createList',
    value: function createList() {
      var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var listTarget = arguments[1];

      listTarget.innerHTML = list.map(function (item, i) {
        return '<li class="list-content">\n                  <input class="one-list-item" type="text" for="todo' + i + '" value="' + item.title + '">\n                  <input type="checkbox" class="checkDone" id="todo' + i + '" data-index="' + i + '" ' + (item.done ? 'checked' : '') + ' />\n                  <span id="delete" class="delete" data-index="' + i + '">X</span>\n           </li>';
      }).join('');
    }
  }, {
    key: 'toggleDone',
    value: function toggleDone() {
      var _this = this;

      this.todoList.addEventListener('click', function (e) {
        if (!e.target.matches('.checkDone')) return;
        var el = e.target;
        var index = el.dataset.index;
        _this.itemsStorage[index].done = !_this.itemsStorage[index].done;
        _this.saveTodoItem();
      });
    }
  }, {
    key: 'removeTodoItem',
    value: function removeTodoItem() {
      var _this2 = this;

      // console.log('aaa');
      this.todoList.addEventListener('click', function (e) {
        if (!e.target.matches('.delete')) return;
        var el = e.target;
        var index = el.dataset.index;
        // array.splice(start, deleteCount)
        _this2.itemsStorage.splice(index, 1);
        // check an array

        console.log(_this2.itemsStorage);
        _this2.saveTodoItem();
      });

      if (this.itemsStorage.length === 0) {
        this.removeData();
        this.removeList.classList.add('hidden');
      }
    }
  }, {
    key: 'showRemoveButton',
    value: function showRemoveButton() {
      if (this.itemsStorage.length > 1) return;
      this.removeList.classList.remove('hidden');
    }
  }, {
    key: 'removeData',
    value: function removeData() {
      // clean an object array
      this.itemsStorage = [];
      localStorage.removeItem('todo-list');
      this.createList(this.itemsStorage, this.todoList);
      this.removeList.classList.add('hidden');
    }
  }, {
    key: 'removeEvent',
    value: function removeEvent() {
      var _this3 = this;

      this.removeList.addEventListener('click', function () {
        _this3.removeData();
      });
    }
  }]);

  return ToDoListItem;
}();

exports.default = ToDoListItem;

},{}]},{},[1]);
