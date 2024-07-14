import { BattleMachineState } from '$lib/models/stateMachine/battle/battleMachineState';
import type { Writable } from 'svelte/store';
import {  writable } from 'svelte/store';

export const battleMachineState: Writable<BattleMachineState> = writable<BattleMachineState>(new BattleMachineState());