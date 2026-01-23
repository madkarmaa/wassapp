import { join } from 'path';
import { readFileSync } from 'fs';
import { is } from '@electron-toolkit/utils';
import { IpcChannels } from '@common/constants';
import { taggedLogger } from '@common/logger';

const logger = taggedLogger('ipc-main');

type IpcMainOn = Parameters<typeof Electron.ipcMain.on>;
type IpcEvent = { event: IpcChannels | `${IpcChannels}`; listener: IpcMainOn[1] };

export const ping = {
    event: IpcChannels.PING,
    listener: () => console.log('pong')
} satisfies IpcEvent;

export const getInjectionScript = {
    event: IpcChannels.GET_INJECTION_SCRIPT,
    listener: (event) => {
        logger.info('Received request for injection script');
        const injectPath = join(import.meta.dirname, '../renderer/inject.js');
        try {
            event.returnValue = readFileSync(injectPath, 'utf-8');
            logger.info('Successfully read injection script from:', injectPath);
        } catch (err) {
            logger.error('Failed to read injection script from:', injectPath, err);
            event.returnValue = '';
        }
    }
} satisfies IpcEvent;

export const isDev = {
    event: IpcChannels.IS_DEV,
    listener: (event) => {
        event.returnValue = is.dev;
    }
} satisfies IpcEvent;
