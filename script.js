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

