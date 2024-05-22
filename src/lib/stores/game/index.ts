import type { Writable } from 'svelte/store';
import {  writable } from 'svelte/store';
import { Game } from '$lib/models/game/model';
import { GameMachineState } from '$lib/models/stateMachine/game/gameMachineState';

export const gameStore: Writable<Game | null> = writable<Game | null>(null);
export const gameMachineState: Writable<GameMachineState> = writable<GameMachineState>(new GameMachineState());