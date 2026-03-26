import { Home } from "./pages/home.js"
import { About } from "./pages/about.js"
import { Clientes } from "./pages/clientes.js"

let clientesView = "list"

export function render(route) {
  const app = document.getElementById("app")

  if (route === "about") {
    app.innerHTML = About()
    document.getElementById("goHome")
      .addEventListener("click", () => {
        render("home")
      })

  } else if (route === "home") {
    app.innerHTML = Home()
    const form = document.getElementById("userForm");
    if (form) {
      form.addEventListener("submit", (e) => {

        const input = document.getElementById("username");
        const name = input.value;

        window.api.addUser(name).then(id => {
          console.log("Usuario ingresado con exito: ", id);
        })
      })
    }


  } else if (route === "clientes") {
    //clientesView = "list";
    app.innerHTML = Clientes(clientesView);

    const goHomeBtn = document.getElementById("goHome")
    if (goHomeBtn) {
      clientesView = "list";
      goHomeBtn.addEventListener("click", () => {
        render("home")
      })
    }

    if (clientesView === "list") {
      document.getElementById("newClient")
        .addEventListener("click", () => {
          clientesView = "form"
          render("clientes")
        })
    }



  }


}