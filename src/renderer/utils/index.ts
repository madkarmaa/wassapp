export type WebpackModule<T extends object = object> = {
    id: string;
    exports: T | null;
    defaultExport?: 'default' extends keyof T ? T['default'] : undefined;
    [key: string]: unknown;
};

export type ModulesMap = Record<string, WebpackModule | null>;

export function findModule<T extends object = object>(
    modules: ModulesMap,
    query: (expectedModuleExports: T) => boolean
): T | null {
    for (const id in modules) {
        const module = modules[id] as WebpackModule<T> | null;

        if (!module || !module.exports) continue;

        console.log(module);

        const exp = module.exports;
        if (query(exp)) return exp;
    }
    return null;
}
