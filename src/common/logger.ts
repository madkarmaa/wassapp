import { APP_NAME } from './constants';

const ogDebug = console.debug;
const ogLog = console.log;
const ogInfo = console.info;
const ogWarn = console.warn;
const ogError = console.error;

export const taggedLogger = (tag: string) => {
    const prefix = `[${APP_NAME}/${tag.trim().toLowerCase()}]`;

    return {
        debug: (...args: unknown[]) => ogDebug(prefix, ...args),
        log: (...args: unknown[]) => ogLog(prefix, ...args),
        info: (...args: unknown[]) => ogInfo(prefix, ...args),
        warn: (...args: unknown[]) => ogWarn(prefix, ...args),
        error: (...args: unknown[]) => ogError(prefix, ...args)
    };
};
