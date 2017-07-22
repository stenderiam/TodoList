
import ToDoList from './todolist.js';

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

const layout = `
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
    `;

const first = new ToDoList(layout);
// const second = new ToDoList(layout);

