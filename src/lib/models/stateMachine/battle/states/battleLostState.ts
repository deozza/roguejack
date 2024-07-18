import { get } from 'svelte/store';
import { type StateInterface } from '../../stateInterface';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';

export class BattleLostState implements StateInterface {
	public name: string = 'BattleLostState';

	public onStateEnter = (): void => {
		console.log(` ${this.name} entered`);
	};

	public onStateExecute(): void {
		console.log(` ${this.name} executed`);
	}

	public onStateExit = (data: object): void => {
		const stateToEnable: string = 'enableOnBattleState';
		const playerPassiveEffects = get(playerSideEffectsStore);
		const enemyPassiveEffects = get(enemySideEffectsStore);

		playerPassiveEffects.forEach((sideEffect) => {
			if (sideEffect[stateToEnable] === this.name) {
				sideEffect.effect(data);
			}
		});

		enemyPassiveEffects.forEach((sideEffect) => {
			if (sideEffect[stateToEnable] === this.name) {
				sideEffect.effect(data);
			}
		});
	};
}
