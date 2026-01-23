import type { PatchCallback } from './types';

export const patches = new Map<string, PatchCallback[]>();
export const modules = new Map<string, object>();
