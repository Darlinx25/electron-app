// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  addUser: (name) => ipcRenderer.invoke('add-user', name),
  addClient: (client) => ipcRenderer.invoke('add-client', client),
  addAportacion: (aportacion) => ipcRenderer.invoke('add-aportacion', aportacion),
  getClients: () => ipcRenderer.invoke('get-clients')
})

