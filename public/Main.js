const { app, BrowserWindow, Menu } = require('electron');
const { log, table, error, warning } = console;


const path = require('path');
const isDev = require('electron-is-dev');
const isMac = process.platform === 'darwin';

require('electron-reload')(__dirname, {
    // Note that the path to electron may vary according to the main file
    electron: require(`${path.join(__dirname, '../node_modules/electron')}`)
});

app.setAboutPanelOptions({
    applicationName: "Juanra-App",
    applicationVersion: "0.0.1",
})


let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        show: false,
        width: 900,
        height: 680,
        webPreferences: { nodeIntegration: true }
    });

    log(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    mainWindow.on('closed', () => mainWindow = null);

    const template = [
        // { role: 'appMenu' }
        ...(isMac ? [{
            label: app.name,
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services' },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideothers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' }
            ]
        }] : []),
        // { role: 'fileMenu' }
        {
            label: 'File',
            submenu: [
                { label: 'Añadir cliente', click: () => {} },
                isMac ? { role: 'close' } : { role: 'quit' },
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
            ]
        }, {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forcereload' },
                { role: 'toggledevtools' },
                { type: 'separator' },
                { role: 'resetzoom' },
                { role: 'zoomin' },
                { role: 'zoomout' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    mainWindow.webContents.openDevTools();


    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })
}

app.on('ready', createWindow);


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});