import { gameStore } from '$lib/stores/game';
import { get } from 'svelte/store';
import { DefaultState } from '../..';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import type { ContinuousEffect, Status } from '$lib/models/effects/interfaces';
import type { StateInterface } from '../../interfaces';

export default class TurnPlayerDrawingState extends DefaultState implements StateInterface {
	public name: string = 'TurnPlayerDrawingState';

	public onStateEnter(): void {
		super.onStateEnter(this.name)
	}

	public onStateExecute(): void {
		gameStore.playerDrawCard();
	}

	public onStateExit(): void {
		super.onStateExit(this.name)
	}
}