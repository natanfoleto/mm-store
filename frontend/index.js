const { app, BrowserWindow } = require('electron');

app.on('ready', () => {
  const win = new BrowserWindow({});
  
  //win.setMenuBarVisibility(false);
  win.maximize();

  win.loadURL('http://localhost:3000');
});