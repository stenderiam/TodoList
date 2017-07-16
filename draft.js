class ToDoList {

    constructor() {
        this.btn = document.getElementById('button');
        this.input = document.getElementById('myinput');
        this.del = document.getElementById('delete');

        this.todoList = document.getElementById('note-menu');
        this.todoForm = document.getElementById('add-todo-form');

        //  this.todoListItemsStorage = JSON.parse(localStorage.getItem(this.todoList));

        this.todoListItemsStorage = JSON.parse(localStorage.getItem(this.todoList)) || [{
            title: 'Duplicate door key',
            done: false,
        },

        {
            title: 'Boom Shka lak',
            done: true,
        },
        ];


        this.removeList = document.getElementById('remove-List');

        //   this.createList(this.todoListItemsStorage, this.todoList);
        this.init();
    }

    init() {
        this.addTodoItem();
        //  this.toggleDone();
        //    this.removeEvent();
    }

    addTodoItem() {
        this.btn.addEventListener('click', () => {
            if (this.input.value.length == 0) return;
            const title = this.input.value;
            const todo = {
                title,
                done: false,
            };
            this.todoListItemsStorage.push(todo);
            this.saveTodoItem();
            this.reset();
        });
        console.log('I see you');
        console.log('2    ', this.todoListItemsStorage);
    }

    saveTodoItem() {
        localStorage.setItem(this.todoList, JSON.stringify(this.todoListItemsStorage));
        this.createList(this.todoListItemsStorage, this.todoList);
        this.showRemoveButton();
    }

    createList(list = [], listTarget) {
        const joinedLines = list.map((item, i) => `<li class="list-content">
                  <input class="one-list-item" type="text" for="todo${i}" value="${item.title}">
                  <input type="checkbox" id="todo${i}" data-index="${i}" ${item.done ? 'checked' : ''} />
                  <span id="delete" data-index="${i}">X</span>
           </li>`).join('');
        listTarget.innerHTML = joinedLines;
    }

    toggleDone() {
        this.todoList.addEventListener('click', (e) => {
            if (!e.target.matches('.checkDone')) return;
            const el = e.target;
            const index = el.dataset.index;
            this.todoListItemsStorage[index].done = !this.todoListItemsStorage[index].done;
            this.saveTodoItem();
        });
    }

    removeSingle() {
        this.todoList.addEventListener('click', (e) => {
            if (!e.target.matches('#delete')) return;
            const el = e.target;
            const index = el.dataset.index;
            this.todoListItemsStorage.splice(index, 1);
            this.saveTodoItem();
            this.test();
        });
    }

    test() {
        if (this.todoListItemsStorage.length === 0) {
            this.removeList.classList.add('hidden');
        }
    }

    showRemoveButton() {
        if (this.todoListItemsStorage.length > 1) return;
        this.removeList.classList.remove('hidden');
    }

    removeData() {
        this.todoListItemsStorage = [];
        localStorage.removeItem(this.todoList);
        this.createList(this.todoListItemsStorage, this.todoList);
        this.removeList.classList.add('hidden');
    }

    removeEvent() {
        this.removeList.addEventListener('click', (e) => {
            this.removeData();
        });
    }
}

