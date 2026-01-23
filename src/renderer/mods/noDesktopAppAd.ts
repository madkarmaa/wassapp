import { patchModule } from '@lib/modules';
import { modMetadata, type Mod } from '@lib/mods';

type Exports = {
    getUserDesktopOs: () => string | null;
};

const METADATA = modMetadata({
    name: 'No Desktop App Ad',
    description: 'Removes the desktop app advertisement banner.',
    version: '1.0.0'
});

export default {
    ...METADATA,
    handler: () =>
        patchModule<Exports>('WAWebDesktopUpsellUtils', (exports) => {
            exports.getUserDesktopOs = () => null;
        })
} satisfies Mod;
