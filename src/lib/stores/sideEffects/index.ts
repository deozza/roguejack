import type EffectInterface from '$lib/models/effect/effectInterface';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const playerSideEffectsStore: Writable<EffectInterface[]> = writable<EffectInterface[]>([]);
