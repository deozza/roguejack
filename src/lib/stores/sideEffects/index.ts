import type { ContinuousEffect, Status } from '$lib/models/effects/interfaces';
import type { ItemTypes } from '$lib/models/items/types';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const playerSideEffectsStore: Writable<Array<Status | ContinuousEffect>> = writable<
	Array<Status | ContinuousEffect>
>([]);

export const playerUsingItemStore: Writable<ItemTypes | null> = writable<ItemTypes | null>(null);

export const enemySideEffectsStore: Writable<Array<Status | ContinuousEffect>> = writable<
	Array<Status | ContinuousEffect>
>([]);

export const enemyUsingItemStore: Writable<ItemTypes | null> = writable<ItemTypes | null>(null);
