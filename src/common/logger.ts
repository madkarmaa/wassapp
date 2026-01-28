import { APP_NAME } from './constants';

export enum LogLevel {
    ERROR = 1 << 0,
    WARN = 1 << 1,
    INFO = 1 << 2
}

let logLevel: LogLevel = LogLevel.INFO;

export const setLogLevel = (level: LogLevel) => (logLevel = level);

export const taggedLogger = (...tags: string[]) => {
    const prefix = `[${APP_NAME}/${tags.map((tag) => tag.trim()).join('/')}]` as const;

    return {
        error: (...args) => logLevel & LogLevel.ERROR && console.error(prefix, ...args),
        warn: (...args) => logLevel & LogLevel.WARN && console.warn(prefix, ...args),
        info: (...args) => logLevel & LogLevel.INFO && console.info(prefix, ...args)
    } satisfies Record<Lowercase<keyof typeof LogLevel>, (...args: unknown[]) => void>;
};
