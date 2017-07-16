function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

const init = function () {
  //   const autocompleteOne = new Autocomplete(data, "myInput");
  //    const todoOne = new ToDoList(title);
  //  const todoListItemsStorage = JSON.parse(localStorage.getItem(this.todoList));
  //   const todoList = document.getElementById('note-menu');

  const todoOne = new ToDoList();
};
ready(init);
