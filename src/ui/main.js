import { render } from "./router.js"

window.go = (route) => {
  render(route)
}

render("home")

window.addEventListener('wheel', (event) => {
  if (event.ctrlKey) {
    if (event.deltaY < 0) {
      window.api.zoomIn();
    } else {
      window.api.zoomOut();
    }
    event.preventDefault();
  }
}, { passive: false });

