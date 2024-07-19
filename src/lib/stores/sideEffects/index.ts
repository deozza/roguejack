import type { PassiveEffectInterface } from '$lib/models/effect/interfaces';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const playerSideEffectsStore: Writable<PassiveEffectInterface[]> = writable<PassiveEffectInterface[]>([]);

export const enemySideEffectsStore: Writable<PassiveEffectInterface[]> = writable<PassiveEffectInterface[]>([]);
