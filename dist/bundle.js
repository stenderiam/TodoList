(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _todolistitem = require('./todolistitem.js');

var _todolistitem2 = _interopRequireDefault(_todolistitem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

var init = function init() {
  // const btnPush = document.getElementById('button');
  // const inputID = document.getElementById('myinput');
  //   const autocompleteOne = new Autocomplete(data, "myInput");
  //    const todoOne = new ToDoList(title);
  //  const todoListItemsStorage = JSON.parse(localStorage.getItem(this.todoList));
  //   const todoList = document.getElementById('note-menu');
  var input = document.querySelector('.myinput');
  var btn = document.querySelector('.button');

  var todoList = document.querySelector('.todo-list');
  var todoForm = document.querySelector('.add-todo');
  var removeList = document.querySelector('.remove-List');

  var itemsStorage = JSON.parse(localStorage.getItem('todo-list')) || [{
    title: 'Duplicate door key',
    done: false
  }, {
    title: 'Boom Shka lak',
    done: true
  }];

  var todoOne = new _todolistitem2.default(btn, input, todoList, todoForm, removeList, itemsStorage);
};
ready(init);

},{"./todolistitem.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToDoListItem = function () {
  function ToDoListItem(btn, input, todoList, todoForm, removeList, itemsStorage) {
    _classCallCheck(this, ToDoListItem);

    this.todoList = todoList;
    this.todoForm = todoForm;
    this.removeList = removeList;
    this.itemsStorage = itemsStorage;
    this.btn = btn;
    this.input = input;
    // this.input = document.getElementById('myinput');
    //  this.btn = document.getElementById('button');
    this.del = document.getElementById('delete');
    //   this.todoList = document.getElementById('note-menu');
    //   this.todoForm = document.getElementById('add-todo-form');
    //  this.removeList = document.getElementById('remove-List');
    // this.itemsStorage = JSON.parse(localStorage.getItem('todo-list'));
    this.createList(this.itemsStorage, this.todoList);
    this.init();
  }

  _createClass(ToDoListItem, [{
    key: 'init',
    value: function init() {
      this.addTodoItem();
      this.toggleDone();
      this.removeTodoItem();
      this.removeEvent();
    }
  }, {
    key: 'addTodoItem',
    value: function addTodoItem() {
      var _this = this;

      this.btn.addEventListener('click', function () {
        if (_this.input.value.length === 0) return;
        var title = _this.input.value;
        var todo = {
          title: title,
          done: false
        };
        _this.itemsStorage.push(todo);
        _this.saveTodoItem();
      });
    }
  }, {
    key: 'saveTodoItem',
    value: function saveTodoItem() {
      // storage.setItem(keyName, keyValue);
      localStorage.setItem('todo-list', JSON.stringify(this.itemsStorage));
      this.createList(this.itemsStorage, this.todoList);
      this.showRemoveButton();
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
      var _this2 = this;

      this.todoList.addEventListener('click', function (e) {
        if (!e.target.matches('.checkDone')) return;
        var el = e.target;
        var index = el.dataset.index;
        _this2.itemsStorage[index].done = !_this2.itemsStorage[index].done;
        _this2.saveTodoItem();
      });
    }
  }, {
    key: 'removeTodoItem',
    value: function removeTodoItem() {
      var _this3 = this;

      this.todoList.addEventListener('click', function (e) {
        if (!e.target.matches('.delete')) return;
        var el = e.target;
        var index = el.dataset.index;
        // array.splice(start, deleteCount)
        _this3.itemsStorage.splice(index, 1);
        // check an array
        console.log(_this3.itemsStorage);
        _this3.saveTodoItem();
        _this3.test();
      });
    }
  }, {
    key: 'test',
    value: function test() {
      if (this.itemsStorage.length === 0) {
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
      localStorage.removeItem('note-menu');
      this.createList(this.itemsStorage, this.todoList);
      this.removeList.classList.add('hidden');
    }
  }, {
    key: 'removeEvent',
    value: function removeEvent() {
      var _this4 = this;

      this.removeList.addEventListener('click', function () {
        _this4.removeData();
      });
    }
  }]);

  return ToDoListItem;
}();

exports.default = ToDoListItem;

},{}]},{},[1]);
