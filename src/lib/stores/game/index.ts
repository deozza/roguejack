import type { Writable } from 'svelte/store';
import {  writable } from 'svelte/store';
import { Game } from './model';

export const gameState: Writable<Game | null> = writable<Game | null>(null);
