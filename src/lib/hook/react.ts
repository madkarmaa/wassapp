import { waitForModule } from '@lib/modules';
import type * as ReactType from 'react';
import type * as ReactDOMType from 'react-dom';
import type * as ReactDOMClientType from 'react-dom/client';

export type ReactRef = typeof ReactType;
export type ReactDOMRef = typeof ReactDOMType & typeof ReactDOMClientType;

export let React: ReactRef;
export let ReactDOM: ReactDOMRef;
export let useState: typeof React.useState;
export let useEffect: typeof React.useEffect;
export let useLayoutEffect: typeof React.useLayoutEffect;
export let useMemo: typeof React.useMemo;
export let useRef: typeof React.useRef;
export let useReducer: typeof React.useReducer;
export let useCallback: typeof React.useCallback;

export const enableReact = async () => {
    React = await waitForModule<ReactRef>('React');
    ({ useState, useEffect, useLayoutEffect, useMemo, useRef, useReducer, useCallback } = React);

    ReactDOM = await waitForModule<ReactDOMRef>('ReactDOM');

    if (!window.WSG.ReactCreateElement) window.WSG.ReactCreateElement = React.createElement;
    if (!window.WSG.ReactFragment) window.WSG.ReactFragment = React.Fragment;
};
