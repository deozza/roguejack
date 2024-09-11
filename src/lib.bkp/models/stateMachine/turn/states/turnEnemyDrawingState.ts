import { gameStore } from '$lib/stores/game';
import { DefaultState } from '../..';
import type { StateInterface } from '../../interfaces';

export default class TurnEnemyDrawingState extends DefaultState implements StateInterface {
	public name: string = 'TurnEnemyDrawingState';

	public onStateEnter(): void {
		super.onStateEnter(this.name);
	}

	public onStateExecute(): void {
		gameStore.enemyDrawCard();
	}

	public onStateExit(): void {
		super.onStateExit(this.name);
	}
}
