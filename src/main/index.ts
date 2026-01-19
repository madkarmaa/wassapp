import { app, shell, BrowserWindow, ipcMain, Menu } from 'electron';
import { join } from 'path';
import { readFileSync } from 'fs';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import {
    APP_ID,
    APP_NAME,
    DEFAULT_HEIGHT,
    DEFAULT_WIDTH,
    MIN_HEIGHT,
    MIN_WIDTH,
    WHATSAPP_WEB_URL
} from '../common/constants';
import icon from '../../resources/icon.png?asset';
import css from './style.css?inline';
import { taggedLogger } from '../common/logger';

const logger = taggedLogger('main');
const USER_AGENT =
    `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${process.versions.chrome.split('.')[0]}.0.0.0 Safari/537.36` as const;

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: DEFAULT_WIDTH,
        minWidth: MIN_WIDTH,
        height: DEFAULT_HEIGHT,
        minHeight: MIN_HEIGHT,
        center: true,
        show: false,
        autoHideMenuBar: true,
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: join(import.meta.dirname, '../preload/index.js'),
            sandbox: true,
            contextIsolation: true
        }
    });

    Menu.setApplicationMenu(null);

    mainWindow.on('ready-to-show', () => {
        mainWindow.maximize();
        mainWindow.show();
    });

    mainWindow.setTitle(APP_NAME);
    mainWindow.on('page-title-updated', (e) => e.preventDefault());

    mainWindow.webContents.on('dom-ready', () => {
        mainWindow.webContents.insertCSS(css);
    });

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: 'deny' };
    });

    // spoof Chrome user agent to avoid being detected as Electron
    // https://stackoverflow.com/a/79406250
    mainWindow.webContents.setUserAgent(USER_AGENT);

    if (is.dev) mainWindow.webContents.openDevTools();

    mainWindow.loadURL(WHATSAPP_WEB_URL);
};

app.whenReady().then(() => {
    electronApp.setAppUserModelId(APP_ID);

    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window);
    });

    ipcMain.on('ping', () => logger.log('pong'));

    ipcMain.on('get-injected-script', (event) => {
        logger.info('Received request for injected script');
        const injectedPath = join(import.meta.dirname, '../renderer/inject.js');
        try {
            event.returnValue = readFileSync(injectedPath, 'utf-8');
            logger.info('Successfully read injected script from:', injectedPath);
        } catch (err) {
            logger.error('Failed to read injected script from:', injectedPath, err);
            event.returnValue = '';
        }
    });

    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
