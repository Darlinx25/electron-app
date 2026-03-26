const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const Database = require('better-sqlite3');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

// WINDOW
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.webContents.openDevTools();
};

// APP LIFECYCLE
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// DATABASE
const db = new Database(path.join(__dirname, 'database.db'));

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEXT
  )
`).run();


db.prepare(`
  CREATE TABLE IF NOT EXISTS aportacion (
  id INTEGER PRIMARY KEY,
  name TEXT UNIQUE
)
`).run();

db.prepare(`
  INSERT OR IGNORE INTO aportacion (name) VALUES
  ('Industria y Comercio'),
  ('Construciion'),
  ('Rural')
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS cliente_aportacion (
  cliente_id INTEGER,
  aportacion_id INTEGER,
  PRIMARY KEY (cliente_id, aportacion_id),
  FOREIGN KEY (cliente_id) REFERENCES clientes(id),
  FOREIGN KEY (aportacion_id) REFERENCES aportacion(id)
);
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY,
    name TEXT,
    rut TEXT,
    num_empresa INTEGER,
    state BOOLEAN NOT NULL DEFAULT 0,
    email TEXT,
    cel TEXT,
    ci TEXT,
    gub TEXT,
    tipoEmp TEXT

  )
`).run();

ipcMain.handle('add-user', (event, name) => {
  const stmt = db.prepare('INSERT INTO users (name) VALUES (?)');
  const info = stmt.run(name);
  return info.lastInsertRowid;
});

ipcMain.handle('add-aportacion', (event, aportacion) => {
  const stmt = db.prepare('INSERT INTO cliente_aportacion (cliente_id,aportacion_id) VALUES (?,?)');
  const info = stmt.run(aportacion.cliente_id,aportacion.aportacion_id);
  return info.lastInsertRowid;
});

ipcMain.handle('add-client', (event, client) => {
  const stmt = db.prepare(`
    INSERT INTO clientes (name, rut, num_empresa, email, cel, ci, gub, tipoEmp) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const info = stmt.run(
    client.nombre, 
    client.rut, 
    client.numEmp, 
    client.correo, 
    client.celular, 
    client.cedula, 
    client.claveGub, 
    client.tipoEmp
  );

  return info.lastInsertRowid;
});