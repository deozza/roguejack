import { gameStore } from '$lib/stores/game';
import { DefaultState } from '../..';
import type { StateInterface } from '../../interfaces';

export default class GameIdleState extends DefaultState implements StateInterface {
	public name: string = 'GameIdleState';

	public onStateEnter(): void {
		super.onStateEnter(this.name);
	}

	public onStateExecute(): void {
		gameStore.reset();
	}

	public onStateExit(): void {
		super.onStateExit(this.name);
	}
}
