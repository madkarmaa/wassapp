import type { JsModuleFinder } from '@lib/types';

export const byId =
    (id: string): JsModuleFinder =>
    (module) =>
        module.id === id;

export const byExports =
    (...exports: string[]): JsModuleFinder =>
    (module) =>
        exports.every((exportName) => exportName in module.exports);
