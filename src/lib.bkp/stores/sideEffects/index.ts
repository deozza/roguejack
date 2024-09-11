import type { ItemTypes } from '$lib/models/items/types';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const playerUsingItemStore: Writable<ItemTypes | null> = writable<ItemTypes | null>(null);

export const enemyUsingItemStore: Writable<ItemTypes | null> = writable<ItemTypes | null>(null);
