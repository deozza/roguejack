import { gameStore } from '$lib/stores/game';
import { DefaultState } from '../..';
import type { StateInterface } from '../../interfaces';

export default class TurnPlayerDrawingState extends DefaultState implements StateInterface {
	public name: string = 'TurnPlayerDrawingState';

	public onStateEnter(): void {
		super.onStateEnter(this.name);
	}

	public onStateExecute(): void {
		gameStore.playerDrawCard();
	}

	public onStateExit(): void {
		super.onStateExit(this.name);
	}
}
