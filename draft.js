

export default class ToDoListItem {

    constructor(btn, input, todoList, todoForm, removeList, itemsStorage) {
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

    init() {
        this.addTodoItem();
        this.toggleDone();
        this.removeTodoItem();
        this.removeEvent();
    }

    addTodoItem() {
        this.btn.addEventListener('click', () => {
            if (this.input.value.length === 0) return;
            const title = this.input.value;
            const todo = {
                title,
                done: false,
            };
            this.itemsStorage.push(todo);
            this.saveTodoItem();
        });
    }


    saveTodoItem() {
        // storage.setItem(keyName, keyValue);
        localStorage.setItem('todo-list', JSON.stringify(this.itemsStorage));
        this.createList(this.itemsStorage, this.todoList);
        this.showRemoveButton();
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
