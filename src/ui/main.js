import { render } from "./router.js"

window.go = (route) => {
  render(route)
}

render("home")

