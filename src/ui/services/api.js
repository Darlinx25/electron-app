export const api = {
  addUser: (name) => window.api.addUser(name),
  addClient: (client) => window.api.addClient(client),
  addAportacion: (aportacion) => window.api.addAportacion(aportacion),
  getClients: () => window.api.getClients(),
}
