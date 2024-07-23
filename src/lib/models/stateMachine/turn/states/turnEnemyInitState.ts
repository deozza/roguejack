
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import { get } from 'svelte/store';
import { DefaultState } from '../..';
import type { ContinuousEffect, Status } from '$lib/models/effects/interfaces';

export default class TurnEnemyInitState extends DefaultState {
	public name: string = 'TurnEnemyInitState';

	public onStateEnter(): void {
		super.onStateEnter()
	}

	public onStateExecute(): void {
	}

	public onStateExit(): void {
		super.onStateExit()
	}
}