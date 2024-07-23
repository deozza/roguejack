import type { ContinuousEffect, Status } from '$lib/models/effects/interfaces';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const playerSideEffectsStore: Writable<Array< Status | ContinuousEffect>> = writable<
Array< Status | ContinuousEffect>
>([]);

export const enemySideEffectsStore: Writable<Array< Status | ContinuousEffect>> = writable<
Array< Status | ContinuousEffect>
>([]);
