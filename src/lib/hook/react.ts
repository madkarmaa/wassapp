import { taggedLogger } from '@common/logger';
import { patchModule } from '@lib/modules';
import type * as ReactType from 'react';

const logger = taggedLogger('hook', 'react');

export type ReactRef = typeof ReactType;

export let React: ReactRef;
export let useState: typeof React.useState;
export let useEffect: typeof React.useEffect;
export let useLayoutEffect: typeof React.useLayoutEffect;
export let useMemo: typeof React.useMemo;
export let useRef: typeof React.useRef;
export let useReducer: typeof React.useReducer;
export let useCallback: typeof React.useCallback;

patchModule('React', (reactModule) => {
    React = reactModule as ReactRef;
    ({ useState, useEffect, useLayoutEffect, useMemo, useRef, useReducer, useCallback } = React);

    window.WSG.ReactCreateElement = React.createElement;
    window.WSG.ReactFragment = React.Fragment;

    logger.info('React is available');
});
