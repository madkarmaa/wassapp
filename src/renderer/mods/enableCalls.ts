import { modMetadata, withDependencies, type Mod } from '@lib/mods';
import { ABFlags } from '@lib/mods/dependencies/ab';

const METADATA = modMetadata({
    name: 'Enable Calls',
    description: 'Enables call functionality in the app.',
    version: '1.0.0'
});

export default {
    ...METADATA,
    handler: withDependencies(ABFlags)(({ overwriteABFlag }) => {
        overwriteABFlag('enable_web_calling', true);
        overwriteABFlag('enable_web_group_calling', true);
        overwriteABFlag('enable_web_calls_tab', true);
        overwriteABFlag('enable_web_call_link', true);
    })
} satisfies Mod;
