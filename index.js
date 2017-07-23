
import TodoBuilder from './modules/todoBuilder.js';

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

const addLists = `<div class="add-list">ADD NEW LIST</div>`;
// localStorage для записей
// const itemsStorage = JSON.parse(localStorage.getItem('todolistItems')) || [];
const first = new TodoBuilder(addLists);
// const second = new TodoBuilder();
// const second = new TodoList(layout, itemsStorage);

