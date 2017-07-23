(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _todoBuilder = require('./modules/todoBuilder.js');

var _todoBuilder2 = _interopRequireDefault(_todoBuilder);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

// html элементы для создания одного списка
/* const layout = `
      <div class="todoList-container"> 
         <div id="add-todo">
           <form class="add-todo">
               <input class="myinput" type="text" placeholder="Don't Forget to..." name="item" required>
               <input class="button" type="submit" value="+">
           </form>
       </div>
         <ul class="todo-list"></ul>
         <div class="remove-List">Remove All</div>
       </div>
   `; */

var addLists = '<div class="add-list">ADD NEW LIST</div>';
// localStorage для записей
// const itemsStorage = JSON.parse(localStorage.getItem('todolistItems')) || [];
var first = new _todoBuilder2.default(addLists);
// const second = new TodoBuilder();
// const second = new TodoList(layout, itemsStorage);

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
    this.itemsStorage = JSON.parse(localStorage.getItem('todolistItems')) || [];
    this.todoLISTS = {};
    this.createTodoLIST();
    this.showCurrentLISTS();
    this.deleteTodoLISTEvent();
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
          id: maxListId + 1
        };
        _this.ListStorage.push(todoLIST);
        _this.saveTodoList();
        //  this.createNewTodoItem(todoLIST);
        var todoListObject = new _todolist2.default(_this.itemsStorage, todoLIST);
        _this.todoLISTS[todoLIST.id] = todoListObject;
        console.log(_this.ListStorage);
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
      var _this2 = this;

      this.ListStorage.forEach(function (todoLIST) {
        var todoListObject = new _todolist2.default(_this2.itemsStorage);
        _this2.todoLISTS[todoLIST.id] = todoListObject;
      });
    }
  }, {
    key: 'deleteTodoLISTEvent',
    value: function deleteTodoLISTEvent() {
      var _this3 = this;

      document.addEventListener('deleteLIST', function (e) {
        var elId = e.detail.id;
        var index = _this3.ListStorage.findIndex(function (elem) {
          return elem.id === elId;
        });
        _this3.ListStorage.splice(index, 1);
        _this3.todoLISTS[elId].deleteLIST();
        delete _this3.todoLISTS[elId];
        _this3.saveTodoList();
      });
    }
  }]);

  return TodoBuilder;
}();

// localStorage.removeItem(todo-list${todoList.id});


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

    //  this.layout = document.querySelector('.container');
    this.container = document.querySelector('.container');
    this.layout = '\n       <div class="todoList-container"> \n         <input class="headline" type="text" value="">\n         <input class="delete-button" type="submit" value="delete list">\n          <div id="add-todo">\n            <form class="add-todo">\n                <input class="myinput" type="text" placeholder="Don\'t Forget to..." name="item" required>\n                <input class="button" type="submit" value="+">\n            </form>\n        </div>\n          <ul class="todo-list"></ul>\n          <div class="remove-List">Remove All Items</div>\n        </div>\n    ';
    this.container.insertAdjacentHTML('beforeend', this.layout);
    this.inputID = document.querySelector('.myinput');
    this.buttonID = document.querySelector('.button');
    this.todoList = document.querySelector('.todo-list');
    this.removeList = document.querySelector('.remove-List');
    this.deleteTodo = document.querySelector('.delete-button');
    this.itemsStorage = itemsStorage;
    this.todoItems = {}; // new TodoItem(s)
    //  this.pushListId = pushListId;
    this.deleteLISTEvent = new CustomEvent('deleteLIST', {
      detail: { id: todoLIST.id }
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
    }
  }, {
    key: 'removeTodoLIST',
    value: function removeTodoLIST() {
      var _this = this;

      this.deleteTodo.addEventListener('click', function () {
        document.dispatchEvent(_this.deleteLISTEvent);
      });
    }
  }, {
    key: 'deleteLIST',
    value: function deleteLIST() {
      this.layout.remove();
    }
  }, {
    key: 'createTodoItemEvent',
    value: function createTodoItemEvent() {
      var _this2 = this;

      this.buttonID.addEventListener('click', function (e) {
        e.preventDefault();
        if (_this2.inputID.value.length === 0) return;
        var title = _this2.inputID.value;
        var maxId = _this2.itemsStorage.length > 0 ? Math.max.apply(Math, _toConsumableArray(_this2.itemsStorage.map(function (elem) {
          return elem.id;
        }))) : 0;
        var todoItem = {
          title: title,
          done: false,
          id: maxId + 1
        };
        _this2.itemsStorage.push(todoItem);
        _this2.saveTodoItem();
        _this2.createNewTodoItem(todoItem);
      });
    }
  }, {
    key: 'saveTodoItem',
    value: function saveTodoItem() {
      localStorage.setItem('todolistItems', JSON.stringify(this.itemsStorage));
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
      var _this3 = this;

      this.itemsStorage.forEach(function (elem) {
        _this3.createNewTodoItem(elem);
      });
    }
  }, {
    key: 'deleteTodoItemEvent',
    value: function deleteTodoItemEvent() {
      var _this4 = this;

      document.addEventListener('deleteItem', function (e) {
        var elId = e.detail.id;
        var index = _this4.itemsStorage.findIndex(function (elem) {
          return elem.id === elId;
        });
        _this4.itemsStorage.splice(index, 1);
        _this4.todoItems[elId].deleteItem();
        delete _this4.todoItems[elId];
        _this4.saveTodoItem();
      });
    }
  }, {
    key: 'updateTodoItemEvent',
    value: function updateTodoItemEvent() {
      var _this5 = this;

      document.addEventListener('updateItem', function (e) {
        var elId = e.detail.elem.id;
        var index = _this5.itemsStorage.findIndex(function (elem) {
          return elem.id === elId;
        });
        _this5.itemsStorage[index] = e.detail.elem;
        _this5.saveTodoItem();
      });
    }
  }, {
    key: 'clearList',
    value: function clearList() {
      this.itemsStorage = [];
      this.todoItems = {};
      localStorage.removeItem('todolistItems');
      this.todoList.innerHTML = '';
      this.removeList.classList.add('hidden');
    }
  }, {
    key: 'clearListEvent',
    value: function clearListEvent() {
      var _this6 = this;

      this.removeList.addEventListener('click', function () {
        _this6.clearList();
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
