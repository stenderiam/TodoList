(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _todoBuilder = require('./modules/todoBuilder.js');

var _todoBuilder2 = _interopRequireDefault(_todoBuilder);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var addLists = '<div class="add-list">ADD NEW LIST</div>';

var first = new _todoBuilder2.default(addLists);

},{"./modules/todoBuilder.js":2}],2:[function(require,module,exports){
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

var _todolist = require('./todolist.js');

var _todolist2 = _interopRequireDefault(_todolist);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var TodoBuilder = function () {
  function TodoBuilder(addLists) {
    _classCallCheck(this, TodoBuilder);

    this.container = document.querySelector('.container');
    this.container.insertAdjacentHTML('afterend', addLists);
    this.addLists = document.querySelector('.add-list');
    this.ListStorage = JSON.parse(localStorage.getItem('allTodoStorage')) || [];
    this.allTodo = {};
    this.initBuilder();
  }

  _createClass(TodoBuilder, [{
    key: 'initBuilder',
    value: function initBuilder() {
      this.addNewTodo();
      this.showList();
      this.deleteTodoList();
      this.headlineEvent();
    }
  }, {
    key: 'addNewTodo',
    value: function addNewTodo() {
      var _this = this;

      this.addLists.addEventListener('click', function (e) {
        e.preventDefault();
        var maxListId = _this.ListStorage.length > 0 ? Math.max.apply(Math, _toConsumableArray(_this.ListStorage.map(function (elem) {
          return elem.id;
        }))) : 0;
        var todoLIST = {
          id: maxListId + 1,
          todoListTitle: ''
        };
        _this.ListStorage.push(todoLIST);
        _this.saveTodoList();
        _this.createTodoList(todoLIST);
      });
    }
  }, {
    key: 'headlineEvent',
    value: function headlineEvent() {
      var _this2 = this;

      document.addEventListener('headlineChange', function (e) {
        var elId = e.detail.todoLIST.id;
        var index = _this2.ListStorage.findIndex(function (todoLIST) {
          return todoLIST.id === elId;
        });
        _this2.ListStorage[index] = e.detail.todoLIST;
        _this2.saveTodoList();
      });
    }
  }, {
    key: 'saveTodoList',
    value: function saveTodoList() {
      localStorage.setItem('allTodoStorage', JSON.stringify(this.ListStorage));
    }
  }, {
    key: 'showList',
    value: function showList() {
      var _this3 = this;

      this.ListStorage.forEach(function (elemLIST) {
        _this3.createTodoList(elemLIST);
      });
    }
  }, {
    key: 'createTodoList',
    value: function createTodoList(todoLIST) {
      var todoListObject = new _todolist2.default(todoLIST);
      this.allTodo[todoLIST.id] = todoListObject;
    }
  }, {
    key: 'deleteTodoList',
    value: function deleteTodoList() {
      var _this4 = this;

      document.addEventListener('deleteLIST', function (e) {
        var elId = e.detail.id;
        var index = _this4.ListStorage.findIndex(function (elem) {
          return elem.id === elId;
        });
        _this4.ListStorage.splice(index, 1);
        _this4.allTodo[elId].onDeleteList();
        delete _this4.allTodo[elId];
        _this4.saveTodoList();
      });
    }
  }]);

  return TodoBuilder;
}();

exports.default = TodoBuilder;

},{"./todolist.js":3}],3:[function(require,module,exports){
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
}(); // TODO: later, to change current methods to pure fanctions


var _todolistitem = require('./todolistitem.js');

var _todolistitem2 = _interopRequireDefault(_todolistitem);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var TodoList = function () {
  function TodoList(todoLIST) {
    _classCallCheck(this, TodoList);

    this.todoLIST = todoLIST;
    this.todoItems = {};
    this.itemsStorage = JSON.parse(localStorage.getItem('todoListItem' + this.todoLIST.id)) || [];
    this.createLayout();
    this.initTodoList();
  }

  _createClass(TodoList, [{
    key: 'initTodoList',
    value: function initTodoList() {
      this.showItem();
      this.addNewItem();
      this.todoCustomEvent();
      this.deleteItem();
      this.updateItem();
      this.clearListOnClick();
      this.clearTodoOnClick();
      this.deleteTodoList();
      this.headlineChange();
    }
  }, {
    key: 'createLayout',
    value: function createLayout() {
      this.layout = '\n       <div class="todoList-container"> \n         <input class="headline" type="text" value ="' + this.todoLIST.todoListTitle + '"> \n         <input class="delete-button" type="submit" value="delete list">\n             \n          <div id="add-todo">\n            <form class="add-todo">\n                <input class="myinput" type="text" placeholder="Don\'t Forget to..." name="item" required>\n                <input class="button" type="submit" value="+">\n            </form>\n        </div>\n          <ul class="todo-list"></ul>\n          <div class="remove-List">Remove All Items</div>\n        </div>\n    ';
      this.todoListContainer = document.createElement('div');
      this.todoListContainer.innerHTML = this.layout;
      this.container = document.querySelector('.container');
      this.container.appendChild(this.todoListContainer);
      this.headline = this.todoListContainer.querySelector('.headline');
      this.inputID = this.todoListContainer.querySelector('.myinput');
      this.buttonID = this.todoListContainer.querySelector('.button');
      this.todoList = this.todoListContainer.querySelector('.todo-list');
      this.removeList = this.todoListContainer.querySelector('.remove-List');
      this.deleteTodo = this.todoListContainer.querySelector('.delete-button');
    }
  }, {
    key: 'todoCustomEvent',
    value: function todoCustomEvent() {
      this.deleteLISTEvent = new CustomEvent('deleteLIST', {
        detail: { id: this.todoLIST.id }
      });
      this.headlineEvent = new CustomEvent('headlineChange', {
        detail: {}
      });
    }
  }, {
    key: 'addNewItem',
    value: function addNewItem() {
      var _this = this;

      this.buttonID.addEventListener('click', function (e) {
        e.preventDefault();
        if (_this.inputID.value.length === 0) return;
        var todoTitle = _this.headline.value;
        var title = _this.inputID.value;
        var maxId = _this.itemsStorage.length > 0 ? Math.max.apply(Math, _toConsumableArray(_this.itemsStorage.map(function (elem) {
          return elem.id;
        }))) : 0;
        var todoItem = {
          todoTitle: todoTitle,
          title: title,
          done: false,
          id: maxId + 1
        };
        _this.itemsStorage.push(todoItem);
        _this.saveItem();
        _this.createItem(todoItem);
      });
    }
  }, {
    key: 'saveItem',
    value: function saveItem() {
      localStorage.setItem('todoListItem' + this.todoLIST.id, JSON.stringify(this.itemsStorage));
    }
  }, {
    key: 'createItem',
    value: function createItem(todoItem) {
      var todoItemObject = new _todolistitem2.default(this.todoList, this.todoListContainer, todoItem);
      this.todoItems[todoItem.id] = todoItemObject;
    }
  }, {
    key: 'showItem',
    value: function showItem() {
      var _this2 = this;

      this.itemsStorage.forEach(function (elem) {
        _this2.createItem(elem);
      });
    }
  }, {
    key: 'deleteItem',
    value: function deleteItem() {
      var _this3 = this;

      this.todoListContainer.addEventListener('deleteItem', function (e) {
        var elId = e.detail.id;
        var index = _this3.itemsStorage.findIndex(function (elem) {
          return elem.id === elId;
        });
        _this3.itemsStorage.splice(index, 1);
        _this3.todoItems[elId].deleteItem();
        delete _this3.todoItems[elId];
        _this3.saveItem();
      });
    }
  }, {
    key: 'updateItem',
    value: function updateItem() {
      var _this4 = this;

      this.todoListContainer.addEventListener('updateItem', function (e) {
        var elId = e.detail.elem.id;
        var index = _this4.itemsStorage.findIndex(function (elem) {
          return elem.id === elId;
        });
        _this4.itemsStorage[index] = e.detail.elem;
        _this4.saveItem();
      });
    }
  }, {
    key: 'clearList',
    value: function clearList() {
      this.itemsStorage = [];
      this.todoItems = {};
      localStorage.removeItem('todoListItem' + this.todoLIST.id);
      this.todoList.innerHTML = '';
      this.removeList.classList.add('hidden');
    }
  }, {
    key: 'clearListOnClick',
    value: function clearListOnClick() {
      var _this5 = this;

      this.removeList.addEventListener('click', function () {
        _this5.clearList();
      });
    }
  }, {
    key: 'clearTodoOnClick',
    value: function clearTodoOnClick() {
      var _this6 = this;

      this.deleteTodo.addEventListener('click', function () {
        _this6.clearList();
      });
    }
  }, {
    key: 'headlineChange',
    value: function headlineChange() {
      var _this7 = this;

      this.headline.addEventListener('change', function () {
        _this7.headlineEvent.detail.todoLIST = Object.assign({}, _this7.todoLIST, { todoListTitle: _this7.headline.value });
        document.dispatchEvent(_this7.headlineEvent);
      });
    }
  }, {
    key: 'deleteTodoList',
    value: function deleteTodoList() {
      var _this8 = this;

      this.deleteTodo.addEventListener('click', function () {
        document.dispatchEvent(_this8.deleteLISTEvent);
      });
    }
  }, {
    key: 'onDeleteList',
    value: function onDeleteList() {
      this.todoListContainer.remove();
    }
  }]);

  return TodoList;
}();

exports.default = TodoList;

},{"./todolistitem.js":4}],4:[function(require,module,exports){
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

var TodoListItem = function () {
  function TodoListItem(todoList, todoListContainer, elem) {
    _classCallCheck(this, TodoListItem);

    this.elem = elem;
    this.todoList = todoList;
    this.parentContainer = todoListContainer;
    this.itemCustomEvent();
    this.createEntry();
    this.removeItemEvent();
    this.inputUpdateEvent();
    this.checkboxUpdateEvent();
  }

  _createClass(TodoListItem, [{
    key: 'itemCustomEvent',
    value: function itemCustomEvent() {
      this.deleteItemEvent = new CustomEvent('deleteItem', {
        detail: { id: this.elem.id }
      });
      this.updateItemEvent = new CustomEvent('updateItem', {
        detail: {}
      });
    }
  }, {
    key: 'createEntry',
    value: function createEntry() {
      this.createElemLi();
      this.createElemCheckbox();
      this.createElemDeleteButton();
      this.createElemInput();
      this.elemLi.appendChild(this.inputElem);
      this.elemLi.appendChild(this.checkboxElem);
      this.elemLi.appendChild(this.deleteButton);
      this.todoList.appendChild(this.elemLi);
    }
  }, {
    key: 'createElemLi',
    value: function createElemLi() {
      this.elemLi = document.createElement('li');
      this.elemLi.className = 'list-content';
    }
  }, {
    key: 'createElemCheckbox',
    value: function createElemCheckbox() {
      this.checkboxElem = document.createElement('input');
      this.checkboxElem.className = 'checkDone';
      this.checkboxElem.type = 'checkbox';
      this.checkboxElem.id = 'todo' + this.elem.id;
      this.checkboxElem.checked = !!this.elem.done;
    }
  }, {
    key: 'createElemDeleteButton',
    value: function createElemDeleteButton() {
      this.deleteButton = document.createElement('div');
      this.deleteButton.className = 'delete';
      this.deleteButton.innerHTML = '<span>X</span>';
    }
  }, {
    key: 'createElemInput',
    value: function createElemInput() {
      this.inputElem = document.createElement('input');
      this.inputElem.className = 'one-list-item';
      this.inputElem.type = 'text';
      this.inputElem.value = this.elem.title;
    }
  }, {
    key: 'deleteItem',
    value: function deleteItem() {
      this.elemLi.remove();
    }
  }, {
    key: 'inputUpdateEvent',
    value: function inputUpdateEvent() {
      var _this = this;

      this.inputElem.addEventListener('change', function () {
        _this.updateItemEvent.detail.elem = Object.assign({}, _this.elem, { title: _this.inputElem.value });
        _this.parentContainer.dispatchEvent(_this.updateItemEvent);
      });
    }
  }, {
    key: 'checkboxUpdateEvent',
    value: function checkboxUpdateEvent() {
      var _this2 = this;

      this.checkboxElem.addEventListener('change', function () {
        _this2.updateItemEvent.detail.elem = Object.assign({}, _this2.elem, { done: _this2.checkboxElem.checked });
        _this2.parentContainer.dispatchEvent(_this2.updateItemEvent);
      });
    }
  }, {
    key: 'removeItemEvent',
    value: function removeItemEvent() {
      var _this3 = this;

      this.deleteButton.addEventListener('click', function () {
        _this3.parentContainer.dispatchEvent(_this3.deleteItemEvent);
      });
    }
  }]);

  return TodoListItem;
}();

exports.default = TodoListItem;

},{}]},{},[1]);
