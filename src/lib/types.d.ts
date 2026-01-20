export type JsModule<Exports extends object = object> = {
    id: string;
    exports: Exports | null;
    defaultExport?: 'default' extends keyof Exports ? Exports['default'] : object;
    [key: string]: unknown;
};

export type ReadyJsModule<Exports extends object = object> = Required<JsModule<Exports>> & {
    exports: Exports;
};

export type JsModulesMap = Record<string, JsModule | null>;
