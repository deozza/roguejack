import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { GameMachineState } from '$lib/models/stateMachine/game/gameMachineState';

export const gameMachineState: Writable<GameMachineState> = writable<GameMachineState>(
	new GameMachineState()
);
