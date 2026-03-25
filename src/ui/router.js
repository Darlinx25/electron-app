import { Home } from "./pages/home.js"
import { About } from "./pages/about.js"

export function render(route) {
  const app = document.getElementById("app")

  if (route === "about") {
    app.innerHTML = About()
  }else if(route === "home") {
    app.innerHTML = Home()
    const form = document.getElementById("userForm");
    form.addEventListener("submit",(e)=>{
        // e.preventDefault(); evita recargar
        const input = document.getElementById("username");
        const name = input.value;

        
        console.log("aaaaaaa",name)
        window.api.addUser(name).then(id =>{
            console.log("Usuario ingresado con exito: ",id);
        })
    })




  }


}