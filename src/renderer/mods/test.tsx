import { app } from '@lib/mods/dependencies/app';
import { modMetadata, withDependencies, type Mod } from '@lib/mods';
import { taggedLogger } from '@common/logger';

const METADATA = modMetadata({
    name: 'Test React Injection',
    description: 'A test component to verify React injection works.',
    version: '1.0.0'
});

const logger = taggedLogger(METADATA.id);

const TestComponent = () => {
    return (
        <div
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                padding: '16px',
                backgroundColor: '#25D366',
                color: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                zIndex: 9999,
                fontFamily: 'system-ui, sans-serif'
            }}
        >
            <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold' }}>
                🚀 WSG Test
            </h3>
            <p style={{ margin: 0, fontSize: '14px' }}>React component successfully injected!</p>
        </div>
    );
};

export default {
    ...METADATA,
    handler: withDependencies(app)(async ({ app }) => {
        logger.warn(app);
        logger.warn(TestComponent());
    })
} satisfies Mod;
