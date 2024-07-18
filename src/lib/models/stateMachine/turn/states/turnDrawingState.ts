import { gameStore } from '$lib/stores/game';
import { get } from 'svelte/store';
import { type StateInterface } from '../../stateInterface';
import { playerSideEffectsStore } from '$lib/stores/sideEffects';

export class TurnDrawingState implements StateInterface {
	public name: string = 'TurnDrawingState';

	public onStateEnter = (): void => {
		console.log(` ${this.name} entered`);
	};

	public async onStateExecute(data: object): Promise<void> {
		if (data['user'] === 'player') {
			gameStore.playerDrawCard();
			return;
		}

		if (data['user'] === 'enemy') {
			await gameStore.enemyAutoDraw();
		}
	}

	public onStateExit = (data: object): void => {
		const passiveEffects = get(playerSideEffectsStore);
		const stateToEnable: string =
			data['user'] === 'player' ? 'enableOnPlayerTurnState' : 'enableOnEnemyTurnState';
		passiveEffects.forEach((sideEffect) => {
			if (sideEffect[stateToEnable] === this.name) {
				sideEffect.effect(data);
			}
		});
	};
}
