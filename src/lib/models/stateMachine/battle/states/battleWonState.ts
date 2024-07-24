import { get } from 'svelte/store';
import { DefaultState } from '../..';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import type { ContinuousEffect, Status } from '$lib/models/effects/interfaces';
import type { StateInterface } from '../../interfaces';

export default class BattleWonState extends DefaultState implements StateInterface {
	public name: string = 'BattleWonState';

	public onStateEnter(): void {
		super.onStateEnter(this.name);
	}

	public onStateExecute(): void {}

	public onStateExit(): void {
		super.onStateExit(this.name);
	}
}
