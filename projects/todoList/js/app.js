let userTodos = [];

const openModalButton = document.querySelector(".open-modal-button");
const btnXclose = document.querySelector(".btnXclose");
const cancel = document.querySelector(".cancel");
const create = document.querySelector(".create");
const modalScreen = document.querySelector(".modal-screen");
const todosContainer = document.querySelector(".todos-container");
const input = document.querySelector(".input");
const complete = document.querySelector(".complete");
const sortBtns = document.querySelectorAll(".sort-menu button");
const sortTitleType = document.querySelector(".sort-title-type");

function openModal() {
  modalScreen.classList.remove("hidden");
}
function closeModal() {
  modalScreen.classList.add("hidden");
}

function createTodo() {
  const userInput = input.value;
  const newTodo = {
    id: Math.floor(Math.random() * 9999),
    title: userInput,
    isComplete: false,
  };

  userTodos.push(newTodo);

  showTodos(userTodos);
  saveIntoLocalStorage(userTodos);
  sortTitleType.innerHTML = "All";
  closeModal();
  input.value = "";
}

function getTodoInLocalStaroge() {
  const localTodos = JSON.parse(localStorage.getItem("todos"));

  if (localTodos) {
    userTodos = localTodos;
  }
  showTodos(userTodos);
}

function removeTodo(todoid) {
  const mainTodosIndex = userTodos.findIndex(function (todo) {
    return todo.id === todoid;
  });
  userTodos.splice(mainTodosIndex, 1);
  saveIntoLocalStorage(userTodos);
  showTodos(userTodos);
}

function saveIntoLocalStorage(todoArray) {
  localStorage.setItem("todos", JSON.stringify(todoArray));
}

function completeTodo(todoId) {
  userTodos.some(function (todo) {
    if (todo.id === todoId) {
      todo.isComplete = true;
      return true;
    }
  });
  saveIntoLocalStorage(userTodos);
  showTodos(userTodos);
}

function showTodos(showTodos) {
  todosContainer.innerHTML = "";

  if (showTodos.length) {
    showTodos.forEach(function (todo) {
      todosContainer.insertAdjacentHTML(
        "beforeend",
        `
        <article class="todo ${todo.isComplete ? "complete" : ""}">
          <div class="todo-data">
            <div class="checkbox">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              </span>
            </div>
            <div>
              <p class="todo-title">${todo.title}</p>
            </div>
          </div>
  
          <div class="todo-buttons">
            <button class="delete" onClick="removeTodo(${todo.id})">ِDelete</button>
            <button class="complete" onClick="completeTodo(${todo.id})">complete</button>
          </div>
        </article>
      `,
      );
    });
  } else {
    todosContainer.innerHTML = `<h1 style="text-align:center">No todos available!</h1>`;
  }
}

function todoSortHandeler(event) {
  const sortType = event.target.value;
  const sortTitle = event.target.innerHTML;

  switch (sortType) {
    case "completed":
      sortTitleType.innerHTML = sortTitle;
      const completedTodo = userTodos.filter(function (todo) {
        return todo.isComplete === true;
      });
      showTodos(completedTodo);
      break;
    case "uncompleted":
      sortTitleType.innerHTML = sortTitle;
      const uncompletedTodo = userTodos.filter(function (todo) {
        return todo.isComplete === false;
      });
      showTodos(uncompletedTodo);
      break;

    default:
      {
        sortTitleType.innerHTML = sortTitle;
        showTodos(userTodos);
      }
      break;
  }
}

sortBtns.forEach(function (sortBtn) {
  sortBtn.addEventListener("click", todoSortHandeler);
});

openModalButton.addEventListener("click", openModal);
btnXclose.addEventListener("click", closeModal);
cancel.addEventListener("click", closeModal);
create.addEventListener("click", createTodo);
