import { gameStore } from '$lib/stores/game';
import { DefaultState } from '../..';

export default class TurnEnemyDrawingState extends DefaultState {
	public name: string = 'TurnEnemyDrawingState';

	public onStateEnter(): void {
		super.onStateEnter()
	}

	public onStateExecute(): void {
		gameStore.enemyDrawCard();
	}

	public onStateExit(): void {
		super.onStateExit()
	}
}

