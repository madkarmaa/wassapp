import { webFrame, ipcRenderer, contextBridge } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { taggedLogger } from '@common/logger';
import { APP_DEV_MODE_KEY, IpcChannels } from '@common/constants';
import css from './style.css?inline';

const logger = taggedLogger('preload');

const injectScript = () => {
    try {
        const script = ipcRenderer.sendSync(IpcChannels.GET_INJECTION_SCRIPT.toString());

        if (script && typeof script === 'string') {
            logger.info('Injecting script into renderer process...');
            webFrame.executeJavaScript(script);
            logger.info('Script injected successfully.');
        } else logger.error('Failed to retrieve injection script from main process.');
    } catch (err) {
        logger.error('Error injecting script:', err);
    }
};

const injectCSS = () => {
    try {
        logger.info('Injecting CSS into renderer process...');
        webFrame.insertCSS(css);
        logger.info('CSS injected successfully.');
    } catch (e) {
        logger.error('Error injecting CSS:', e);
    }
};

contextBridge.exposeInMainWorld(
    APP_DEV_MODE_KEY,
    ipcRenderer.sendSync(IpcChannels.IS_DEV.toString())
);

contextBridge.exposeInMainWorld('electron', electronAPI);

injectScript();
injectCSS();
