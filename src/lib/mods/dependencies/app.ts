import { waitForElement } from '@lib/utils';
import { WA_APP_ELEMENT_SELECTOR } from '@common/constants';
import { type ModDependency } from '@lib/mods';

export const app = (async () => {
    const app = await waitForElement<HTMLDivElement>(document, WA_APP_ELEMENT_SELECTOR);
    return { app };
}) satisfies ModDependency;
