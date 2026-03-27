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

      <button type="submit">Crear</button>
    </form>


`   
    return `
    <h1>Clientes</h1>
    <button id="goHome">Home</button>
    <button id="newClient">Nuevo Cliente</button>
    
`
    
}


export async function loadClients() {
  const clients = await window.api.getClients();
  
  const container = document.getElementById('clientsList');
  container.innerHTML = clients.map(c => `
    <div>
      <p>Nombre: ${c.name}</p>
      <p>RUT: ${c.rut}</p>
      <p>Email: ${c.email}</p>
      <p>Celular: ${c.cel}</p>
    </div>
  `).join('');
}
