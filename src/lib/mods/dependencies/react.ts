import { WA_APP_ELEMENT_SELECTOR } from '@common/constants';
import { type ModDependency } from '@lib/mods';
import { waitForModule } from '@lib/modules';
import { waitForElement } from '@lib/utils';
import type * as ReactType from 'react';
import type * as ReactDOMType from 'react-dom';
import type * as ReactDOMClientType from 'react-dom/client';

type ReactRef = typeof ReactType;
type ReactDOMRef = typeof ReactDOMType & typeof ReactDOMClientType;

export type ReactComponentWithReact<Props extends object = object> = ReactType.FC<
    Props & { React: ReactRef }
>;

export type ReactComponentWithReactDOM<Props extends object = object> = ReactType.FC<
    Props & { ReactDOM: ReactDOMRef }
>;

export type ReactComponent<Props extends object = object> = ReactType.FC<
    Props & { React: ReactRef; ReactDOM: ReactDOMRef }
>;

export const react = (async () => {
    const React = await waitForModule<ReactRef>('React');
    const ReactDOM = await waitForModule<ReactDOMRef>('ReactDOM');
    return { React, ReactDOM };
}) satisfies ModDependency;

export const app = (async () => {
    const app = await waitForElement<HTMLDivElement>(document, WA_APP_ELEMENT_SELECTOR);
    return { app };
}) satisfies ModDependency;
