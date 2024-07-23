import { gameStore } from '$lib/stores/game';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import { DefaultState } from '../..';

export default class GameInitState extends DefaultState {
	public name: string = 'GameInitState';

	public onStateEnter(): void {
		super.onStateEnter()
	}

	public onStateExecute(data: object): void {
		if(data.character === undefined || data.character === null) {
			throw new Error('Character not selected');
		}

		playerSideEffectsStore.set([]);
		enemySideEffectsStore.set([]);
		gameStore.setPlayer(data.character)
	}

	public onStateExit(): void {
		super.onStateExit()
	}
}

