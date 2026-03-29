export function About() {
  return {
    html: `
      <h1>About</h1>
      <button id="goHome">Home</button>
    `,
    init: () => {
      document.getElementById("goHome")
        .addEventListener("click", () => {
          window.go("home")
        })
    }
  }
}
