import { APP_NAME } from '@common/constants';
import { modMetadata, type Mod } from '@lib/mods';
import { patchModule } from '@lib/modules';
import cat from './cat.gif?inline';

const METADATA = modMetadata({
    name: 'Replace Landing Component',
    description: 'Replaces the default landing component.',
    version: '1.0.0'
});

const NewLanding = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3rem',
                height: '100%'
            }}
        >
            <h2 style={{ fontSize: '3rem' }}>
                Welcome to{' '}
                <span style={{ fontWeight: 'bold', color: 'var(--WDS-accent)' }}>{APP_NAME}</span>{' '}
                :3
            </h2>
            <img
                src={cat}
                alt="Cat"
                style={{
                    aspectRatio: '1 / 1',
                    borderRadius: '9999px',
                    width: '12rem'
                }}
            />
        </div>
    );
};

export default {
    ...METADATA,
    handler: () =>
        patchModule<{ default: typeof NewLanding }>('WAWebIntroPanelV2.react', (exports) => {
            exports.default = NewLanding;
        })
} satisfies Mod;
