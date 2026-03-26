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

      const form = document.getElementById("clientForm");
      if (form) {
        form.addEventListener("submit", (e) => {
          e.preventDefault(); //para no recargar 
          const nombre = document.getElementById("nombre");
          const correo = document.getElementById("correo");
          const celular = document.getElementById("celular");
          const cedula = document.getElementById("cedula");
          const rut = document.getElementById("rut");
          const numEmp = document.getElementById("numEmp");
          const claveGub = document.getElementById("claveGub");
          const tipoEmp = document.getElementById("tipoEmp");


          const client = {
            nombre: nombre.value,
            rut: rut.value,
            numEmp: numEmp.value,
            correo: correo.value,
            celular: celular.value,
            cedula: cedula.value,
            claveGub: claveGub.value,
            tipoEmp: tipoEmp.value
          };

          const aportacionIyC = document.getElementById("aportacionIyC");
          const aportacionContruccion = document.getElementById("aportacionContruccion");
          const aportacionRural = document.getElementById("aportacionRural");




          window.api.addClient(client).then(id => {
            console.log("Cliente ingresado con exito: ", id);
            const idCliente = id;
            if (aportacionIyC.checked) {
              const apIyc = {
                cliente_id:idCliente,
                aportacion_id:1
              }
              window.api.addAportacion(apIyc).then(id => {
                console.log("Aportacion IyC ingresada con exito: ", id);
              })
            }
            if (aportacionContruccion.checked) {
              const apCont = {
                cliente_id:idCliente,
                aportacion_id:2
              }
              window.api.addAportacion(apCont).then(id => {
                console.log("Aportacion Construccion ingresada con exito: ", id);
              })
            }
            if (aportacionRural.checked) {
              const apRural = {
                cliente_id:idCliente,
                aportacion_id:3
              }
              window.api.addAportacion(apRural).then(id => {
                console.log("Aportacion rural ingresada con exito: ", id);
              })
            }



          })
        })




      }



    }

  }
}