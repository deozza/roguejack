import { DefaultState } from '../..';
import { gameStore } from '$lib/stores/game';
import type { StateInterface } from '../../interfaces';

export default class TurnPlayerBustedState extends DefaultState implements StateInterface {
	public name: string = 'TurnPlayerBustedState';

	public onStateEnter(): void {
		super.onStateEnter(this.name)
	}

	public onStateExecute(): void {
		gameStore.resolveFight();
	}

	public onStateExit(): void {
		super.onStateExit(this.name)
	}
}