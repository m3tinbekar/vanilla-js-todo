let name;

const loginButton = document.getElementById("login");


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

const modal = document.getElementById("createTask");
const btn = document.getElementById("newTask");
const span = document.getElementsByClassName("close")[0];

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
