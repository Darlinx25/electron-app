import { api } from "../services/api.js"

export function Home() {
  return {
    html: `
      <h1>Home</h1>
      <button onclick="go('clientes')">Cientes</button>
      <button onclick="go('tramites')">Tramites</button>
      <button onclick="go('about')">About</button>
    `,
    
  }
}
