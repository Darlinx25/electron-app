import { Home } from "./pages/home.js"
import { About } from "./pages/about.js"
import { Clientes } from "./pages/clientes.js"

const routes = {
  home: Home,
  about: About,
  clientes: Clientes,
}

export function render(route) {
  const app = document.getElementById("app")
  const Page = routes[route]

  if (!Page) return

  const { html, init } = Page()
  app.innerHTML = html
  if (init) init()
}
