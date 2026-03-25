export function Home() {
  return `
     <h1>Home</h1>

    <form id="userForm">
      <input type="text" id="username" placeholder="Nombre" />
      <button type="submit">Crear</button>
    </form>


    <button onclick="go('about')">Home</button>

  `
  
}



