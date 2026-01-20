import type * as ReactType from 'react';
import { taggedLogger } from '@common/logger';
import { byId } from '@lib/modules/finders';
import { findModule } from '@lib/modules';
import { modMetadata, type Mod } from '@lib/mods';

const MODULE_ID = 'React' as const;
const METADATA = modMetadata({
    name: 'Test Mod',
    description: 'This is a test mod for demonstration purposes.',
    version: '1.0.0'
});

const logger = taggedLogger(METADATA.id);

export default {
    ...METADATA,
    execute: async (modules) => {
        const reactModule = await findModule<typeof ReactType>(modules, byId(MODULE_ID));
        if (!reactModule) return logger.error(`Module ${MODULE_ID} not found`);

        const { exports: React } = reactModule;

        logger.info(React.createElement);
    }
} satisfies Mod;
