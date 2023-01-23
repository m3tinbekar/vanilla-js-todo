let name;

const loginButton = document.getElementById("login");
const addTodoButton = document.getElementById("addTodo");
const addTask = document.getElementById("task");
const dueDate = document.getElementById("dueDate");
const checkButton = document.getElementsByClassName("todo-check");

const modal = document.getElementById("createTask");
const openModal = document.getElementById("newTask");
const closeModal = document.getElementsByClassName("close");

const todoPage = document.querySelector(".container");
todoPage.style.display = "none";

const loginPage = document.querySelector(".container-auth");

const login = () => {
  name = document.getElementById("username").value;
  renderTodos(name);
  if (name !== "") {
    todoPage.style.display = "flex";
    loginPage.style.display = "none";
  } else {
    window.alert("Please enter Username!");
  }
};
document.body.addEventListener("keydown", function (e) {
  if (e.keyCode == 13) {
    e.preventDefault();
    loginButton.click();
  }
});
loginButton.addEventListener("click", () => login());

const checkTodo = (username, date, index, status) => {
  let todos = JSON.parse(localStorage.getItem(username));
  todos[date][index] = { task: todos[date][index].task, done: !status };
  localStorage.setItem(username, JSON.stringify(todos));
  renderTodos(username);
};

const addTodo = (username) => {
  const task = document.getElementById("task").value;
  if (document.getElementById("dueDate").value === "" || task === "") {
    window.alert("Please fill in the fields !");
  } else {
    const dueDate = new Date(document.getElementById("dueDate").value);
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "full",
      timeStyle: "long",
      timeZone: "Europe/Istanbul",
    })
      .format(dueDate)
      .split(" ", 3)
      .join(" ");

    let todos = JSON.parse(localStorage.getItem(username)) || {};
    if (!todos[formattedDate]) {
      todos[formattedDate] = [];
    }
    todos[formattedDate].push({ task: task, done: false });
    localStorage.setItem(username, JSON.stringify(todos));
    modal.style.display = "none";
    renderTodos(username);
    window.alert("Task Succesfully Added");
  }
};
const deleteTodo = (username, date, index) => {
  let todos = JSON.parse(localStorage.getItem(username));
  todos[date].splice(index, 1);
  localStorage.setItem(username, JSON.stringify(todos));
  renderTodos(username);
};

const updateTodo = (username, date, index, task, done) => {
  let todos = JSON.parse(localStorage.getItem(username));
  todos[date][index] = { task: task, done: done };
  localStorage.setItem(username, JSON.stringify(todos));
  renderTodos(username);
};

const renderTodos = (username) => {
  const todos = JSON.parse(localStorage.getItem(username)) || {};
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";
  for (const date in todos) {
    if (todos[date].length > 0) {
      const todoListItem = document.createElement("li");
      todoListItem.classList.add("todo-list-item");
      todoListItem.innerHTML = `<div class="date" id="dateId"> <span class="date-btn"><i class="fas fa-calendar"></i></span> ${date}</div>${todos[
        date
      ]
        .map((todo, index) => {
          return `
          
          <div class="${
            todo.done ? "todo-content is-active" : "todo-content"
          }"> 
          <button class="todo-check" onclick="checkTodo('${username}', '${date}', ${index}, ${
            todo.done
          })"> <i class="fas fa-check"></i>  </button>
          <div class="todo-content-text"> ${todo.task} </div>
          <div class="right-buttons"> 
          <button class="todo-delete" onclick="deleteTodo('${username}', '${date}', ${index})"><i class="fas fa-trash-alt"></i></button>
          <button class="todo-update" onclick="updateTodo('${username}', '${date}', ${index}, prompt('Enter new task'), ${
            todo.done
          })"><i class="fas fa-edit"></i></button></div></div>
          `;
        })
        .join("")}`;
      todoList.appendChild(todoListItem);
    }
  }
  addTask.value = "";
  dueDate.value = "";
};

openModal.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == closeModal.close) {
    modal.style.display = "none";
  }
};

addTodoButton.addEventListener("click", () => addTodo(name));
