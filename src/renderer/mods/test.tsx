import { react, type ReactComponentWithReact, app } from '@lib/mods/dependencies/react';
import { modMetadata, withDependencies, type Mod } from '@lib/mods';

const METADATA = modMetadata({
    name: 'Test Component',
    description: 'A test component to verify React injection works.',
    version: '1.0.0'
});

const TestComponent = (({ React }) => {
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (ref.current) console.warn('[Test Mod] Component element:', ref.current);
    }, []);

    return (
        <div
            ref={ref}
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
}) satisfies ReactComponentWithReact;

export default {
    ...METADATA,
    handler: withDependencies(
        react,
        app
    )(async ({ React, ReactDOM, app }) => {
        const container = document.createElement('div');
        container.id = 'wsg-test-component';
        app.appendChild(container);

        const root = ReactDOM.createRoot(container);
        root.render(<TestComponent React={React} />);

        console.log('[Test Mod] Component mounted successfully!');
    })
} satisfies Mod;
