import { TurnMachineState } from '$lib/models/stateMachine/turn/turnMachineState';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const turnMachineState: Writable<TurnMachineState> = writable<TurnMachineState>(
	new TurnMachineState()
);