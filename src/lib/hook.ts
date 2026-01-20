import { taggedLogger } from '@common/logger';
import { WHATSAPP_DEBUG_MODULE } from '@common/constants';
import type { JsModulesMap } from './types';

const logger = taggedLogger('hook');

export const hookModuleLoader = (onloaded: (modules: JsModulesMap) => void) => {
    let req: typeof window.require | undefined;
    Object.defineProperty(window, 'require', {
        configurable: true,
        enumerable: true,
        get: () => req,
        set(value) {
            logger.info('Detected change to window.require');
            req = value;

            queueMicrotask(() => {
                try {
                    logger.info(`Attempting to load ${WHATSAPP_DEBUG_MODULE} module...`);

                    const modules = req?.(WHATSAPP_DEBUG_MODULE)?.modulesMap as JsModulesMap;
                    if (!modules) return;

                    logger.info(`${WHATSAPP_DEBUG_MODULE} module loaded, loading mods...`);
                    onloaded(modules);
                } catch (err) {
                    logger.error(`Failed to load ${WHATSAPP_DEBUG_MODULE} module`, err);
                }
            });
        }
    });
};
