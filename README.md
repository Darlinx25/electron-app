## Proyecto Electron con better-sqlite3

## Instalación
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash source ~/.bashrc 
nvm install 20
nvm use 20
npm install better-sqlite3
```
---
## Ejecutar
```
npm install
npm start
```
---
## Si algo falla
```
rm -rf node_modules package-lock.json
npm install
npm rebuild better-sqlite3
npm start
```

---
## Stack
- Electron 41.0.3
- better-sqlite3 12.8.0
- Electron Forge 7.11.1
- Node.js 20
- npm 9+
---
