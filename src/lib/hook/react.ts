import { taggedLogger } from '@common/logger';
import { reqLazy } from './require';
import type * as ReactType from 'react';

const logger = taggedLogger('hook', 'react');
const REACT_MODULE_ID = 'React' as const;

export type ReactRef = typeof ReactType;

export let React: ReactRef;
export let useState: typeof React.useState;
export let useEffect: typeof React.useEffect;
export let useLayoutEffect: typeof React.useLayoutEffect;
export let useMemo: typeof React.useMemo;
export let useRef: typeof React.useRef;
export let useReducer: typeof React.useReducer;
export let useCallback: typeof React.useCallback;

reqLazy<[typeof REACT_MODULE_ID], [ReactRef]>([REACT_MODULE_ID], (_react) => {
    React = _react;
    ({ useState, useEffect, useLayoutEffect, useMemo, useRef, useReducer, useCallback } = React);

    window.WSG.ReactCreateElement = React.createElement;
    window.WSG.ReactFragment = React.Fragment;

    logger.info(`React v${React.version} hooked`);
});
