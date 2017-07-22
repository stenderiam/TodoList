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

var layout = '\n       <div class="todoList-container"> \n          <div id="add-todo">\n            <form class="add-todo">\n                <input class="myinput" type="text" placeholder="Don\'t Forget to..." name="item" required>\n                <input class="button" type="submit" value="+">\n            </form>\n        </div>\n        <ul class="todo-list"></ul>\n        <div class="remove-List">Remove All</div>\n      </div>\n    ';

var first = new _todolist2.default(layout);
// const second = new ToDoList(layout);

},{"./todolist.js":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var itemsStorage = JSON.parse(localStorage.getItem('todo-list')) || [{
  title: 'Duplicate door key',
  done: false,
  id: 'test'
}, {
  title: 'Boom Shka lak',
  done: true,
  id: 'test'
}];

exports.default = itemsStorage;

},{}],3:[function(require,module,exports){
"use strict";

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

var _todolistitem = require("./todolistitem.js");

var _todolistitem2 = _interopRequireDefault(_todolistitem);

var _localStorage = require("./localStorage.js");

var _localStorage2 = _interopRequireDefault(_localStorage);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var ToDoList = function () {
  function ToDoList(layout) {
    _classCallCheck(this, ToDoList);

    // создание контейнера для todo list
    this.layout = document.querySelector('.cntr');
    this.layout.insertAdjacentHTML('beforeend', layout);
    // получение данных для компановки todo list
    this.inputID = document.querySelector('.myinput');
    this.buttonID = document.querySelector('.button');
    this.todoList = document.querySelector('.todo-list');
    this.removeList = document.querySelector('.remove-List');
    this.itemsStorage = _localStorage2.default;
    this.id = 0;
    this.listArray = [];
    this.deleteItem;
    this.init();
  }

  _createClass(ToDoList, [{
    key: "init",
    value: function init() {
      this.showCurrentList();
      this.createTodoItem();
      //  this.customDeleteEvent();
    }

    // создать новую запись по клику на кнопку

  }, {
    key: "createTodoItem",
    value: function createTodoItem() {
      var _this = this;

      this.buttonID.addEventListener('click', function (e) {
        e.preventDefault();
        new _todolistitem2.default(_this.inputID, _this.buttonID, _this.todoList, _this.itemsStorage, _this.id++, _this.removeList);
        //  console.log(this.inputID);
      });
    }

    // показать при старте все записи листа

  }, {
    key: "showCurrentList",
    value: function showCurrentList() {
      var _this2 = this;

      this.itemsStorage.forEach(function () {
        _this2.listArray.push(new _todolistitem2.default(_this2.inputID, _this2.buttonID, _this2.todoList, _this2.itemsStorage, _this2.id++, _this2.removeList, _this2.deleteItem));
      });
    }

    /* customDeleteEvent() {
        this.deleteItem = new CustomEvent('deleteItem', {
          detail: { id: 'id' },
        });
      } */

  }]);

  return ToDoList;
}();

/*

  constructor(inputTest, btn) {
    //  this.todoList = todoList;
    //  this.todoForm = todoForm;
    // this.removeList = removeList;
    // this.itemsStorage = itemsStorage;
    this.btn = btn;
    this.taskCounter = 0;
    this.inputTest = inputTest;
    this.todoForm = document.querySelector('.add-todo');
    this.removeList = document.querySelector('.remove-List');
    this.todoList = document.querySelector('.todo-list');
    // this.del = document.getElementById('delete');
    this.itemsStorage = JSON.parse(localStorage.getItem('todo-list')) || [
      {
        title: 'Duplicate door key',
        done: false,
        //  id: 0,
      },
      {
        title: 'Boom Shka lak',
        done: true,
      },
    ];
    this.init();
  }

  init() {
    this.handler();
    //  this.customHangler();
    //  this.showList();
  }

  showList() {
    // storage.setItem(keyName, keyValue);
    localStorage.setItem('todo-list', JSON.stringify(this.itemsStorage));
    this.createList(this.itemsStorage, this.todoList);
    // this.showRemoveButton();
    console.log(this.itemsStorage);
  }

 createList(list = [], listTarget) {
   listTarget.innerHTML = list.map((item, i) => `<li class="list-content">
                 <input class="one-list-item" type="text" for="todo${i}" value="${item.title}">
                 <input type="checkbox" class="checkDone" id="todo${i}" data-index="${i}" ${item.done ? 'checked' : ''} />
                 <span id="delete" class="delete" data-index="${i}">X</span>
          </li>`).join('');
 }

 customHangler() {
   this.showList = new CustomEvent('showList', {
     detail: {
       count: 'done',
     },
   });
   this.input.parentNode.addEventListener('showList', (event) => {
     this.createList(this.itemsStorage, this.todoList);
   });
 }

handler() {
  this.btn.addEventListener('click', (e) => {
    e.preventDefault();
    new ToDoListItem(this.btn, this.inputTest, this.todoList, this.todoForm, this.removeList, this.itemsStorage, this.taskCounter++);
  });
}

}
*/

exports.default = ToDoList;

},{"./localStorage.js":2,"./todolistitem.js":4}],4:[function(require,module,exports){
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
  function todoItem(inputPush, buttonPush, todoListPush, itemsStoragePush, idPush, removeListPush, deleteItemPush) {
    _classCallCheck(this, todoItem);

    this.button = buttonPush;
    this.inputPush = inputPush;
    this.todoList = todoListPush;
    this.itemsStorage = itemsStoragePush;
    this.removeList = removeListPush;
    this.id = idPush;
    this.deleteItemPush = deleteItemPush;
    this.remove;
    this.createEntry();
    this.addTodoItem();
    this.removeEvent();
    this.removeTodoItem();
    //  this.toggleDone();
  }

  // создание одной записи в лист


  _createClass(todoItem, [{
    key: 'createEntry',
    value: function createEntry() {
      this.todoList.innerHTML = this.itemsStorage.map(function (item, i) {
        return '<li class="list-content">\n                  <input class="one-list-item" type="text" for="todo' + i + '" value="' + item.title + '">            \n                  <input type="checkbox" class="checkDone" id="todo' + i + '" data-index="' + i + '" ' + (item.done ? 'checked' : '') + ' />\n                  <span id="delete" class="delete" data-index="' + i + '">X</span>\n           </li>';
      }).join('');
    }

    // добавление одной записи в лист

  }, {
    key: 'addTodoItem',
    value: function addTodoItem() {
      if (this.inputPush.value.length === 0) return;
      var title = this.inputPush.value;
      var todo = {
        title: title,
        done: false,
        id: this.id
      };
      this.itemsStorage.push(todo);
      //  console.log(this.itemsStorage);
      this.saveTodoItem();
    }
    /*
      toggleDone() {
        this.todoList.addEventListener('click', (e) => {
          if (!e.target.matches('.checkDone')) return;  
          const elemWithId10 = this.itemsStorage.find(elem => elem.id === 3); 
          console.log(elemWithId10);
          /  const el = e.target;
             const index = el.dataset.index;
             this.itemsStorage[index].done = !this.itemsStorage[index].done;
          this.saveTodoItem();
        });
      } */

    // сохранение одной записи в лист

  }, {
    key: 'saveTodoItem',
    value: function saveTodoItem() {
      localStorage.setItem('todo-list', JSON.stringify(this.itemsStorage));
      this.createEntry();
    }

    // очистить список и удалить все записи

  }, {
    key: 'clearList',
    value: function clearList() {
      this.itemsStorage = [];
      localStorage.removeItem('todo-list');
      this.createEntry(this.itemsStorage, this.todoList);
      this.removeList.classList.add('hidden');
    }
  }, {
    key: 'removeTodoItem',
    value: function removeTodoItem() {
      var _this = this;

      this.todoList.addEventListener('click', function (e) {
        if (!e.target.matches('.delete')) return;
        var el = e.target;
        var index = el.dataset.index;
        _this.itemsStorage.splice(index, 1);
        _this.saveTodoItem();
      });
      if (this.itemsStorage.length === 0) {
        this.removeData();
        this.removeList.classList.add('hidden');
      }
    }

    /* removeTodoItem() {
       this.todoList.addEventListener('click', (e) => {
         if (!e.target.matches('.delete')) return;
         const el = e.target;
         //  this.itemsStorage.splice(index, 1);
         el.dispatchEvent(this.deleteItemPush);
         //    console.log(this.itemsStorage);
         this.saveTodoItem();
       });
     } */

    // удалить записи по клику на кнопку

  }, {
    key: 'removeEvent',
    value: function removeEvent() {
      var _this2 = this;

      this.removeList.addEventListener('click', function () {
        _this2.clearList();
        //   this.removeList.dispatchEvent(this.deleteItemPush);
      });
    }

    /*  removeTask() {
        this.remove.addEventListener("click", () => {
          this.deleteEvent.detail.number = this.counter;
          this.parent.parentNode.dispatchEvent(this.deleteEvent);
          this.mainContainer.remove();
          this.parent.parentNode.dispatchEvent(this.watch);
        });
      } */
    // найти по айди, получить объект, поменять false на true 

  }]);

  return todoItem;
}();

/*
   export default class ToDoListItem {

  constructor(btnPush, inputPush, todoListPush, todoFormPush, removeListPush, itemsStoragePush, taskCounterPush) {
    this.btn = btnPush;
    //  this.showListEvent = showList;
    this.input = inputPush;
    this.todoList = todoListPush;
    this.todoForm = todoFormPush;
    this.removeList = removeListPush;
    this.itemsStorage = itemsStoragePush;
    this.counter = taskCounterPush;
    //  this.del = document.getElementById('delete');
    // this.createList(this.itemsStorage, this.todoList);
    this.addTodoItem();
    this.toggleDone();
    this.removeTodoItem();
    this.removeEvent();
  }

  addTodoItem() {
    if (this.input.value.length === 0) return;
    const title = this.input.value;
    //  let setId = this.counter;
    const todo = {
      title,
      done: false,
      id: this.counter,
    };
    this.itemsStorage.push(todo);
    console.log(this.itemsStorage);
    this.saveTodoItem();
  }



  saveTodoItem() {
    // storage.setItem(keyName, keyValue);
    localStorage.setItem('todo-list', JSON.stringify(this.itemsStorage));
    this.createList(this.itemsStorage, this.todoList);
    // this.showRemoveButton();
  }

  createList(list = [], listTarget) {
    listTarget.innerHTML = list.map((item, i) => `<li class="list-content">
                  <input class="one-list-item" type="text" for="todo${i}" value="${item.title}">
                  <input type="checkbox" class="checkDone" id="todo${i}" data-index="${i}" ${item.done ? 'checked' : ''} />
                  <span id="delete" class="delete" data-index="${i}">X</span>
           </li>`).join('');
  }

  toggleDone() {
    this.todoList.addEventListener('click', (e) => {
      if (!e.target.matches('.checkDone')) return;
      const el = e.target;
      const index = el.dataset.index;
      this.itemsStorage[index].done = !this.itemsStorage[index].done;
      this.saveTodoItem();
    });
  }

  removeTodoItem() {
    // console.log('aaa');
    this.todoList.addEventListener('click', (e) => {
      if (!e.target.matches('.delete')) return;
      const el = e.target;
      const index = el.dataset.index;
      // array.splice(start, deleteCount)
      this.itemsStorage.splice(index, 1);

      // check an array

      console.log(this.itemsStorage);
      this.saveTodoItem();
    });

    if (this.itemsStorage.length === 0) {
      this.removeData();
      this.removeList.classList.add('hidden');
    }
  }

  showRemoveButton() {
    if (this.itemsStorage.length > 1) return;
    this.removeList.classList.remove('hidden');
  }

  removeData() {
    // clean an object array
    this.itemsStorage = [];
    localStorage.removeItem('todo-list');
    this.createList(this.itemsStorage, this.todoList);
    this.removeList.classList.add('hidden');
  }

  removeEvent() {
    this.removeList.addEventListener('click', () => {
      this.removeData();
    });
  }
}

*/

exports.default = todoItem;

},{}]},{},[1]);
