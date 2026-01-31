import { taggedLogger } from '@common/logger';
import { patches } from './state';
import type { PatchCallback } from './types';

const logger = taggedLogger('hook', 'patcher');

export const registerPatch = (moduleId: string, callback: PatchCallback) => {
    if (!patches.has(moduleId)) patches.set(moduleId, []);
    patches.get(moduleId)!.push(callback);
};

export const applyPatches = (moduleId: string, exports: object) => {
    const callbacks = patches.get(moduleId);
    if (!callbacks) return;

    callbacks.forEach((callback) => {
        try {
            callback(exports);
        } catch (err) {
            logger.error(`Error patching module ${moduleId}`, err);
        }
    });

    logger.verbose(`Applied ${callbacks.length} patch(es) to module ${moduleId}`);
};
