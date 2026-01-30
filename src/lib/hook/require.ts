import { WA_REQUIRELAZY_METHOD } from '@common/constants';
import { taggedLogger } from '@common/logger';

const logger = taggedLogger('hook', 'require');

export type RequireLazy = <
    const Ids extends readonly string[],
    TModules extends { [K in keyof Ids]: object }
>(
    moduleIds: Ids,
    callback: (...modules: TModules) => void
) => void;

type RuntimeRequireLazyCallback = (...modules: readonly object[]) => void;
type RuntimeRequireLazy = (
    moduleIds: readonly string[],
    callback: RuntimeRequireLazyCallback
) => void;

let realRequireLazy: RuntimeRequireLazy | undefined = undefined;
const queue: Parameters<RuntimeRequireLazy>[] = [];

export const requireLazy: RequireLazy = (moduleIds, callback) => {
    if (realRequireLazy) realRequireLazy(moduleIds, callback as RuntimeRequireLazyCallback);
    else queue.push([moduleIds, callback as RuntimeRequireLazyCallback]);
};

export const requireLazyAsync = <
    const Ids extends readonly string[],
    TModules extends { [K in keyof Ids]: object }
>(
    moduleIds: Ids
) =>
    new Promise<TModules>((resolve) => {
        requireLazy<Ids, TModules>(moduleIds, (...modules) => resolve(modules));
    });

const install = (requireLazy: RuntimeRequireLazy) => {
    realRequireLazy = requireLazy;
    logger.info(`${WA_REQUIRELAZY_METHOD} is now available`);

    for (const args of queue) requireLazy(...args);
    queue.length = 0;
};

const hookRequireLazy = () => {
    if (window[WA_REQUIRELAZY_METHOD]) install(window[WA_REQUIRELAZY_METHOD]);
    else
        Object.defineProperty(window, WA_REQUIRELAZY_METHOD, {
            configurable: true,
            enumerable: true,
            get: () => realRequireLazy,
            set: (value) => install(value)
        });
};

hookRequireLazy();
