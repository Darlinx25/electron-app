export function Clientes(view) {
  if (view === "form")
    return `
    <h1>Clientes</h1>
    
    <button id="goHome">Home</button>
    <button id="newClient">Nuevo Cliente</button>
    <hr class=linea1>
    <form id="clientForm">
    </br>
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
      
      <label for="tipoEmp">Tipo de Empresa</label>
        <select name="tipoEmp" id="tipoEmp">
            <option value="Monotributo">Monotributo</option>
            <option value="LitE">Literal E</option>
            <option value="platano" selected>Regimen General</option>
            <option value="platano" selected>Otro</option>
        </select>
      
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
      <div class ="derecha">
          <div>  
            <button type="submit">Cancelar</button>
          </div>
          <div>
            <button type="submit">Crear</button>
          </div>
      </div>
      

      
    </form>
    <div id="clientsList"></div>

`
  return `
    <h1>Clientes</h1>
    <button id="goHome">Home</button>
    <button id="newClient">Nuevo Cliente</button>
    <div id="clientsList"></div>
    
`

}


export async function loadClients() {
  const clients = await window.api.getClients();
  const container = document.getElementById('clientsList');
  container.innerHTML = `
      <table >
        <caption>

          <h3>Lista de Clientes</h3>
        </caption>
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Tipo Empresa</th> 
      <th>Aportacion</th>
      <th>Celular</th>
      <th>Email</th>
      <th>N° Empresa</th>
      <th>RUT</th>
      <th>CI</th>
      <th>GUB</th>
    </tr>
  </thead>
  <tbody>
  ${clients.map(c => `
    <tr>
      <td> ${c.name}</td>
      <td>${c.tipoEmp}</td>
      <td>${c.aportaciones}</td>
      <td>${c.cel}</td>
      <td>${c.email}</td>
      <td>${c.num_empresa}</td>
      <td>${c.rut}</td>
      <td>${c.ci}</td>
      <td>${c.gub}</td>
    </tr>
    `).join("")}
  </tbody>
</table>

 
  `;
}
