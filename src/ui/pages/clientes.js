import { api } from "../services/api.js"

let clientesView = "list"

export function Clientes() {
  return {
    html: clientesView === "form" ? formTemplate() : listTemplate(),
    init: () => {
      setupListView()
      if (clientesView === "form") {
        setupFormView()
      }
    }
  }
}

function listTemplate() {
  return `
    <h1>Clientes</h1>
    <button id="goHome">Home</button>
    <button id="newClient">Nuevo Cliente</button>
    <div id="clientsList"></div>
  `
}

function formTemplate() {
  return `
    <h1>Clientes</h1>
    <button id="goHome">Home</button>
    <button id="newClient">Nuevo Cliente</button>
    <hr class=linea1>

    <form id="clientForm">
      </br>
      <div class="contenedor">
        <div>
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" />

          <label for="correo">Correo:</label>
          <input type="email" id="correo" name="correo" />

          <label for="celular">Celular:</label>
          <input type="text" id="celular" name="celular" />

          <label for="cedula">Cedula:</label>
          <input type="text" id="cedula" name="cedula" />

          <label for="rut">RUT:</label>
          <input type="rut" id="rut" name="rut" />

          <label for="numEmp">N° de Empresa:</label>
          <input type="numEmp" id="numEmp" name="numEmp" />

          <label for="claveGub">Clave GUB:</label>
          <input type="text" id="claveGub" name="claveGub" />
        </div>

        <div class="derecha">
          <label for="inicioAct">Inicio de actividades:</label>
          <input type="date" id="inicioAct" name="inicioAct" />

          <label for="usrFocer">Usuario FOCER:</label>
          <input type="text" id="usrFocer" name="usrFocer" />

          <label for="claveFocer">Clave Focer:</label>
          <input type="text" id="claveFocer" name="claveFocer" />

          <label>Aportacion:</label>

          <label for="aportacionIyC" class="check-item">
          <input type="checkbox" name="aportacionIyC" id="aportacionIyC" value="Industria y Comercio">
          <span>Industria y Comercio</span>
          </label>

 
          <label for="aportacionContruccion" class="check-item">
          <input type="checkbox" name="aportacionContruccion" id="aportacionContruccion" value="Construccion">
          <span>Construccion</span>
          </label>

          <label for="aportacionRural" class="check-item">
          <input type="checkbox" name="aportacionRural" id="aportacionRural" value="Rural">
          <span>Rural</span>
          </label>



        </div>
      </div>

      <label for="tipoEmp">Tipo de Empresa:</label>
      <select name="tipoEmp" id="tipoEmp">
        <option value="Monotributo">Monotributo</option>
        <option value="LitE">Literal E</option>
        <option value="Regimen General" selected>Regimen General</option>
        <option value="Otro" selected>Otro</option>
      </select>



      <div class="derecha">
        <button type="submit">Crear</button>
        <button id="cancelarCliente" class="cancelar">Cancelar</button>
      </div>
    </form>

    <div id="clientsList"></div>
  `
}

function setupListView() {
  loadClients()

  document.getElementById("goHome")?.addEventListener("click", () => {
    clientesView = "list"
    window.go("home")
  })

  document.getElementById("newClient")?.addEventListener("click", () => {
    clientesView = "form"
    window.go("clientes")
  })
}

function setupFormView() {
  document.getElementById("goHome")?.addEventListener("click", () => {
    clientesView = "list"
    window.go("home")
  })

  document.getElementById("newClient")?.addEventListener("click", () => {
    clientesView = "form"
    window.go("clientes")
  })

  document.getElementById("cancelarCliente")?.addEventListener("click", () => {
    clientesView = "list"
    window.go("clientes")
  })

  document.getElementById("clientForm")?.addEventListener("submit", handleFormSubmit)
}

async function handleFormSubmit(e) {
  e.preventDefault()

  const client = {
    nombre: document.getElementById("nombre").value,
    rut: document.getElementById("rut").value,
    numEmp: document.getElementById("numEmp").value,
    correo: document.getElementById("correo").value,
    celular: document.getElementById("celular").value,
    cedula: document.getElementById("cedula").value,
    claveGub: document.getElementById("claveGub").value,
    tipoEmp: document.getElementById("tipoEmp").value,
    inicioAct: document.getElementById("inicioAct").value,
    usrFocer: document.getElementById("usrFocer").value,
    claveFocer: document.getElementById("claveFocer").value,
  }

  const aportacionIyC = document.getElementById("aportacionIyC")
  const aportacionContruccion = document.getElementById("aportacionContruccion")
  const aportacionRural = document.getElementById("aportacionRural")

  const idCliente = await api.addClient(client)
  console.log("Cliente ingresado con exito: ", idCliente)

  const promises = []
  if (aportacionIyC.checked) {
    promises.push(api.addAportacion({ cliente_id: idCliente, aportacion_id: 1 }))
  }
  if (aportacionContruccion.checked) {
    promises.push(api.addAportacion({ cliente_id: idCliente, aportacion_id: 2 }))
  }
  if (aportacionRural.checked) {
    promises.push(api.addAportacion({ cliente_id: idCliente, aportacion_id: 3 }))
  }

  if (promises.length > 0) {
    await Promise.all(promises)
  }

  clientesView = "list"
  window.go("clientes")
}

export async function loadClients() {
  const clients = await api.getClients()
  const container = document.getElementById("clientsList")
  container.innerHTML = `
    <table class="tabla">
      <caption>
        <h3 style="display: flex;">Lista de Clientes</h3>
      </caption>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Tipo Empresa</th>
          <th>Aportacion</th>
          <th>RUT</th>
          <th>N° Empresa</th>
          <th>CI</th>
          <th>GUB</th>
          <th>Celular</th>
          <th>Email</th>
          <th>Fecha Inicio</th>
          <th>Usuario Focer</th>
          <th>Clave Focer</th>
          <th class="tablaAcciones"></th>
        </tr>
      </thead>
      <tbody>
        ${clients.map(c => `
          <tr>
            <td>${c.name}</td>
            <td>${c.tipoEmp}</td>
            <td>${c.aportaciones}</td>
            <td>${c.rut}</td>
            <td>${c.num_empresa}</td>
            <td>${c.ci}</td>
            <td>${c.gub}</td>
            <td>${c.cel}</td>
            <td>${c.email}</td>
            <td>${c.inicioAct}</td>
            <td>${c.usrFocer}</td>
            <td>${c.claveFocer}</td>
            <td class="tablaAcciones">
              <button class="edit-btn" data-id="${c.id}">Editar</button>
              <button class="copy-btn" data-id="${c.id}">Copiar</button>
              <button class="delete-btn" data-id="${c.id}">Eliminar</button>
            </td>
          </tr>
          
        `).join("")}
      </tbody>
    </table>
  `
}
