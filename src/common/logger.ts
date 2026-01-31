import { APP_NAME } from './constants';

export enum LogLevel {
    ERROR = 1,
    WARN = 2,
    INFO = 3,
    DEBUG = 4,
    VERBOSE = 5
}

let logLevel: LogLevel = LogLevel.INFO;
export const setLogLevel = (level: LogLevel) => (logLevel = level);

const craftMessage = (level: LogLevel, tags: string[]) => {
    const levelStr = LogLevel[level] as keyof typeof LogLevel;
    const timestamp = new Date().toISOString().replace('T', ' ').replace('Z', '');
    const tagStr = tags
        .map((tag) => tag.trim())
        .filter((tag) => tag)
        .join('/');

    return `${timestamp}  ${levelStr}  --- [${APP_NAME}/${tagStr}]`;
};

export const taggedLogger = (...tags: string[]) => {
    return {
        error: (...args) =>
            logLevel >= LogLevel.ERROR && console.log(craftMessage(LogLevel.ERROR, tags), ...args),
        warn: (...args) =>
            logLevel >= LogLevel.WARN && console.log(craftMessage(LogLevel.WARN, tags), ...args),
        info: (...args) =>
            logLevel >= LogLevel.INFO && console.log(craftMessage(LogLevel.INFO, tags), ...args),
        debug: (...args) =>
            logLevel >= LogLevel.DEBUG && console.log(craftMessage(LogLevel.DEBUG, tags), ...args),
        verbose: (...args) =>
            logLevel >= LogLevel.VERBOSE &&
            console.log(craftMessage(LogLevel.VERBOSE, tags), ...args)
    } satisfies Record<Lowercase<keyof typeof LogLevel>, (...args: unknown[]) => void>;
};
