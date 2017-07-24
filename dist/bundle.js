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
    this.ListStorage = JSON.parse(localStorage.getItem('todoLISTStorage')) || [];
    this.todoLISTS = {};
    this.createTodoLIST();
    this.showCurrentLISTS();
    this.deleteTodoLISTEvent();
    this.headlineChangeEvent();
  }

  _createClass(TodoBuilder, [{
    key: 'createTodoLIST',
    value: function createTodoLIST() {
      var _this = this;

      this.addLists.addEventListener('click', function (e) {
        e.preventDefault();
        //  const title = this.inputID.value;
        var maxListId = _this.ListStorage.length > 0 ? Math.max.apply(Math, _toConsumableArray(_this.ListStorage.map(function (elem) {
          return elem.id;
        }))) : 0;
        var todoLIST = {
          id: maxListId + 1,
          todoListTitle: ''
        };
        _this.ListStorage.push(todoLIST);
        _this.saveTodoList();
        _this.createNewTodoLIST(todoLIST);
        //  console.log(this.ListStorage);
      });
    }
  }, {
    key: 'headlineChangeEvent',
    value: function headlineChangeEvent() {
      var _this2 = this;

      document.addEventListener('headlineInputChange', function (e) {
        console.log('ffff');
        var elId = e.detail.todoLIST.id;
        var index = _this2.ListStorage.findIndex(function (todoLIST) {
          return todoLIST.id === elId;
        });

        _this2.ListStorage[index] = e.detail.todoLIST;
        _this2.saveTodoList();
        console.log(_this2.ListStorage);
      });
    }
  }, {
    key: 'saveTodoList',
    value: function saveTodoList() {
      localStorage.setItem('todoLISTStorage', JSON.stringify(this.ListStorage));
    }
  }, {
    key: 'showCurrentLISTS',
    value: function showCurrentLISTS() {
      var _this3 = this;

      this.ListStorage.forEach(function (elemLIST) {
        _this3.createNewTodoLIST(elemLIST);
      });
    }
  }, {
    key: 'createNewTodoLIST',
    value: function createNewTodoLIST(todoLIST) {
      var todoListObject = new _todolist2.default(this.itemsStorage, todoLIST);
      this.todoLISTS[todoLIST.id] = todoListObject;
    }
  }, {
    key: 'deleteTodoLISTEvent',
    value: function deleteTodoLISTEvent() {
      var _this4 = this;

      document.addEventListener('deleteLIST', function (e) {
        var elId = e.detail.id;
        var index = _this4.ListStorage.findIndex(function (elem) {
          return elem.id === elId;
        });
        _this4.ListStorage.splice(index, 1);
        _this4.todoLISTS[elId].deleteLIST();
        delete _this4.todoLISTS[elId];
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
  function TodoList(itemsStorage, todoLIST) {
    _classCallCheck(this, TodoList);

    this.layout = '\n       <div class="todoList-container"> \n         <input class="headline" type="text">\n         <input class="delete-button" type="submit" value="delete list">\n             \n          <div id="add-todo">\n            <form class="add-todo">\n                <input class="myinput" type="text" placeholder="Don\'t Forget to..." name="item" required>\n                <input class="button" type="submit" value="+">\n            </form>\n        </div>\n          <ul class="todo-list"></ul>\n          <div class="remove-List">Remove All Items</div>\n        </div>\n    ';
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
    this.itemsStorage = JSON.parse(localStorage.getItem('todolistItems' + todoLIST.id)) || [];
    this.todoItems = {}; // new TodoItem(s)
    this.todoLIST = todoLIST;
    this.deleteLISTEvent = new CustomEvent('deleteLIST', {
      detail: { id: todoLIST.id }
    });
    this.headlineEvent = new CustomEvent('headlineInputChange', {
      detail: {}
    });
    this.init();
  }

  _createClass(TodoList, [{
    key: 'init',
    value: function init() {
      this.showCurrentList();
      this.createTodoItemEvent();
      this.deleteTodoItemEvent();
      this.clearListEvent();
      this.updateTodoItemEvent();
      this.removeTodoLIST();
      this.headlineChange();
    }
  }, {
    key: 'headlineChange',
    value: function headlineChange() {
      var _this = this;

      this.headline.addEventListener('change', function () {
        _this.headlineEvent.detail.todoLIST = Object.assign({}, _this.todoLIST, { todoListTitle: _this.headline.value });
        document.dispatchEvent(_this.headlineEvent);
      });
    }
  }, {
    key: 'removeTodoLIST',
    value: function removeTodoLIST() {
      var _this2 = this;

      this.deleteTodo.addEventListener('click', function () {
        document.dispatchEvent(_this2.deleteLISTEvent);
      });
    }
  }, {
    key: 'deleteLIST',
    value: function deleteLIST() {
      this.todoListContainer.remove();
    }
  }, {
    key: 'createTodoItemEvent',
    value: function createTodoItemEvent() {
      var _this3 = this;

      this.buttonID.addEventListener('click', function (e) {
        e.preventDefault();
        if (_this3.inputID.value.length === 0) return;
        var todoTitle = _this3.headline.value;
        var title = _this3.inputID.value;
        var maxId = _this3.itemsStorage.length > 0 ? Math.max.apply(Math, _toConsumableArray(_this3.itemsStorage.map(function (elem) {
          return elem.id;
        }))) : 0;
        var todoItem = {
          todoTitle: todoTitle,
          title: title,
          done: false,
          id: maxId + 1
        };
        _this3.itemsStorage.push(todoItem);
        _this3.saveTodoItem();
        _this3.createNewTodoItem(todoItem);
      });
    }
  }, {
    key: 'saveTodoItem',
    value: function saveTodoItem() {
      localStorage.setItem('todolistItems' + this.elemLIST.id, JSON.stringify(this.itemsStorage));
    }
  }, {
    key: 'createNewTodoItem',
    value: function createNewTodoItem(todoItem) {
      var todoItemObject = new _todolistitem2.default(this.inputID, this.buttonID, this.todoList, this.itemsStorage, this.removeList, todoItem);
      this.todoItems[todoItem.id] = todoItemObject;
    }
  }, {
    key: 'showCurrentList',
    value: function showCurrentList() {
      var _this4 = this;

      this.itemsStorage.forEach(function (elem) {
        _this4.createNewTodoItem(elem);
      });
    }
  }, {
    key: 'deleteTodoItemEvent',
    value: function deleteTodoItemEvent() {
      var _this5 = this;

      document.addEventListener('deleteItem', function (e) {
        var elId = e.detail.id;
        var index = _this5.itemsStorage.findIndex(function (elem) {
          return elem.id === elId;
        });
        _this5.itemsStorage.splice(index, 1);
        _this5.todoItems[elId].deleteItem();
        delete _this5.todoItems[elId];
        _this5.saveTodoItem();
      });
    }
  }, {
    key: 'updateTodoItemEvent',
    value: function updateTodoItemEvent() {
      var _this6 = this;

      document.addEventListener('updateItem', function (e) {
        var elId = e.detail.elem.id;
        var index = _this6.itemsStorage.findIndex(function (elem) {
          return elem.id === elId;
        });
        _this6.itemsStorage[index] = e.detail.elem;
        _this6.saveTodoItem();
      });
    }
  }, {
    key: 'clearList',
    value: function clearList() {
      this.itemsStorage = [];
      this.todoItems = {};
      localStorage.removeItem('todolistItems' + this.elemLIST.id);
      this.todoList.innerHTML = '';
      this.removeList.classList.add('hidden');
    }
  }, {
    key: 'clearListEvent',
    value: function clearListEvent() {
      var _this7 = this;

      this.removeList.addEventListener('click', function () {
        _this7.clearList();
      });
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
  function TodoListItem(inputPush, buttonPush, todoListPush, itemsStoragePush, removeList, elem) {
    _classCallCheck(this, TodoListItem);

    this.button = buttonPush;
    this.elem = elem;
    this.inputPush = inputPush;
    this.todoList = todoListPush;
    this.itemsStorage = itemsStoragePush;
    this.removeList = removeList;
    this.deleteItemEvent = new CustomEvent('deleteItem', {
      detail: { id: elem.id }
    });
    this.updateItemEvent = new CustomEvent('updateItem', {
      detail: {}
    });
    this.createEntry();
    this.removeTodoItemEvent();
    this.inputUpdateEvent();
    this.checkboxUpdateEvent();
  }

  _createClass(TodoListItem, [{
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
        document.dispatchEvent(_this.updateItemEvent);
      });
    }
  }, {
    key: 'checkboxUpdateEvent',
    value: function checkboxUpdateEvent() {
      var _this2 = this;

      this.checkboxElem.addEventListener('change', function () {
        _this2.updateItemEvent.detail.elem = Object.assign({}, _this2.elem, { done: _this2.checkboxElem.checked });
        document.dispatchEvent(_this2.updateItemEvent);
      });
    }
  }, {
    key: 'removeTodoItemEvent',
    value: function removeTodoItemEvent() {
      var _this3 = this;

      this.deleteButton.addEventListener('click', function () {
        document.dispatchEvent(_this3.deleteItemEvent);
      });
    }
  }]);

  return TodoListItem;
}();

exports.default = TodoListItem;

},{}]},{},[1]);
