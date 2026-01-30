import type { DepsTuple, ModDependency, ModHandler, ModMetadata, ModId } from './types';

export const withDependencies =
    <const Deps extends readonly ModDependency[]>(...dependencies: Deps) =>
    (handler: (deps: DepsTuple<Deps>) => MaybePromise<void>): ModHandler =>
    async () => {
        const results = await Promise.all(dependencies.map((dep) => dep()));
        const deps = Object.assign({}, ...results);
        await handler(deps);
    };

export const modMetadata = (metadata: OmitFix<ModMetadata, 'id'>): ModMetadata => ({
    id: metadata.name.trim().toLowerCase().replaceAll(' ', '-') as ModId,
    name: metadata.name.trim(),
    description: metadata.description.trim(),
    version: metadata.version
});

export const getPropertyNames = <T extends object>(obj: T): (keyof T)[] =>
    [
        ...Object.getOwnPropertyNames(obj),
        ...Object.getOwnPropertyNames(Object.getPrototypeOf(obj))
    ].filter((key) => key !== 'constructor') as (keyof T)[];
