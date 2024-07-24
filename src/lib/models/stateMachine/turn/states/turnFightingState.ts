import { gameStore } from '$lib/stores/game';
import { DefaultState } from '../..';
import type { StateInterface } from '../../interfaces';

export default class TurnFightingState extends DefaultState implements StateInterface {
	public name: string = 'TurnFightingState';

	public onStateEnter(): void {
		super.onStateEnter(this.name);
	}

	public onStateExecute(): void {
		gameStore.resolveFight();
	}

	public onStateExit(): void {
		super.onStateExit(this.name);
	}
}
