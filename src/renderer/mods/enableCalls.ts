import { patchModule } from '@lib/modules';
import { modMetadata, type Mod } from '@lib/mods';

const METADATA = modMetadata({
    name: 'Enable Calls',
    description: 'Enables call functionality in the app.',
    version: '1.0.0'
});

export default {
    ...METADATA,
    handler: () =>
        patchModule<{
            default: {
                getEnvironment: () => 'prod' | 'intern' | 'dev';
                isGuest: boolean;
                isWeb: boolean;
                isWindows: boolean;
            };
        }>('WAWebEnvironment', (exports) => {
            exports.default.getEnvironment = () => 'prod';
            exports.default.isWeb = false;
            exports.default.isWindows = true;
        })
} satisfies Mod;
