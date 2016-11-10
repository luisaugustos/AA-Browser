const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
electron.crashReporter.start({
  productName: 'AA-Browser',
  companyName: 'Explode Co.',
  submitURL: '',
  autoSubmit: true
});

var mainWindow = null;

app.on('window-all-closed', function() {
    app.quit();
});

app.on('ready', function() {
  var openWindow = function(){
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: '#2e2c29'
      });
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    //mainWindow.webContents.openDevTools();
    mainWindow.on('closed', function() {
      mainWindow = null;
    });
  };

  // Método que inicia a janela do navegador
  openWindow();
});
