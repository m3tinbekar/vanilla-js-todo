let name;

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const loginButton = document.getElementById("login");
const addTodoButton = document.getElementById("addTodo");
const addTask = document.getElementById("task");
const dueDate = document.getElementById("dueDate");
dueDate.valueAsDate = new Date();
const checkButton = document.getElementsByClassName("todo-check");

const modal = document.getElementById("createTask");
const btn = document.getElementById("newTask");
const span = document.getElementsByClassName("close")[0];

const todoPage = document.querySelector(".container");
todoPage.style.display = "none";

const loginPage = document.querySelector(".container-auth");

const login = () => {
  name = document.getElementById("username").value;
  if (name !== "") {
    todoPage.style.display = "flex";
    loginPage.style.display = "none";
  } else {
    window.alert("Please enter Username!");
  }
};
loginButton.addEventListener("click", () => login());

const checkTodo = (username, date, index, status) => {
  let todos = JSON.parse(localStorage.getItem(username));
  todos[date][index] = { task: todos[date][index].task, done: !status };
  localStorage.setItem(username, JSON.stringify(todos));
  renderTodos(username);
};

const addTodo = (username) => {
  const task = document.getElementById("task").value;
  const dueDate = new Date(document.getElementById("dueDate").value);
  const formattedDate = ` ${days[dueDate.getDay()]}, ${
    months[dueDate.getMonth()]
  } ${dueDate.getDate()}`;

  let todos = JSON.parse(localStorage.getItem(username)) || {};
  if (!todos[formattedDate]) {
    todos[formattedDate] = [];
  }
  todos[formattedDate].push({ task: task, done: false });
  localStorage.setItem(username, JSON.stringify(todos));
  modal.style.display = "none";
  renderTodos(username);
  window.alert("Task Succesfully Added");
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

btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

addTodoButton.addEventListener("click", () => addTodo(name));
