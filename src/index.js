const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const Database = require('better-sqlite3');

if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.webContents.openDevTools();
};

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

ipcMain.handle('zoom-in', () => {
  const zoom = mainWindow.webContents.getZoomFactor();
  mainWindow.webContents.setZoomFactor(Math.min(zoom + 0.1, 3.0));
});

ipcMain.handle('zoom-out', () => {
  const zoom = mainWindow.webContents.getZoomFactor();
  mainWindow.webContents.setZoomFactor(Math.max(zoom - 0.1, 0.5));
});

// DATABASE
const db = new Database(path.join(__dirname, 'database.db'));

db.prepare(`
  CREATE TABLE IF NOT EXISTS aportacion (
  id INTEGER PRIMARY KEY,
  name TEXT UNIQUE
)
`).run();

db.prepare(`
  INSERT OR IGNORE INTO aportacion (name) VALUES
  ('IyC'),
  ('Construcción'),
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
    tipoEmp TEXT,
    inicioAct TEXT,
    usrFocer TEXT,
    claveFocer TEXT

  )
`).run();

ipcMain.handle('add-aportacion', (event, aportacion) => {
  const stmt = db.prepare('INSERT INTO cliente_aportacion (cliente_id,aportacion_id) VALUES (?,?)');
  const info = stmt.run(aportacion.cliente_id,aportacion.aportacion_id);
  return info.lastInsertRowid;
});

ipcMain.handle('get-clients', () => {
  const stmt = db.prepare('SELECT * FROM clientes');
  return stmt.all();
})


ipcMain.handle('get-clients-con-aportaciones', () => {
  return db.prepare(`
    SELECT c.*, 
    GROUP_CONCAT(a.name) as aportaciones
    FROM clientes c
    LEFT JOIN cliente_aportacion ca ON c.id = ca.cliente_id
    LEFT JOIN aportacion a ON ca.aportacion_id = a.id
    GROUP BY c.id
    ORDER BY c.name ASC;
  `).all();
});

ipcMain.handle('get-clients-con-aportaciones-orden-de-registro', () => {
  return db.prepare(`
    SELECT c.*, 
    GROUP_CONCAT(a.name) as aportaciones
    FROM clientes c
    LEFT JOIN cliente_aportacion ca ON c.id = ca.cliente_id
    LEFT JOIN aportacion a ON ca.aportacion_id = a.id
    GROUP BY c.id
  `).all();
});


ipcMain.handle('get-aportacion', () => {
  const stmt = db.prepare('SELECT * FROM cliente_aportacion');
  return stmt.all();
})

ipcMain.handle('add-client', (event, client) => {
  const stmt = db.prepare(`
    INSERT INTO clientes (name, rut, num_empresa, email, cel, ci, gub, tipoEmp,inicioAct,usrFocer,claveFocer) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const info = stmt.run(
    client.nombre, 
    client.rut, 
    client.numEmp, 
    client.correo, 
    client.celular, 
    client.cedula, 
    client.claveGub, 
    client.tipoEmp,
    client.inicioAct,
    client.usrFocer,
    client.claveFocer
  );

  return info.lastInsertRowid;
});


