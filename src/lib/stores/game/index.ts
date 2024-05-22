import type { Writable } from 'svelte/store';
import {  writable } from 'svelte/store';
import { Game } from '$lib/models/game/model';

export const gameState: Writable<Game | null> = writable<Game | null>(null);
