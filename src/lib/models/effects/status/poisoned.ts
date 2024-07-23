import { gameStore } from "$lib/stores/game";
import { enemySideEffectsStore, playerSideEffectsStore } from "$lib/stores/sideEffects";
import { delay } from "$lib/utils";
import type { ContinuousEffect, Status } from "../interfaces";

export default class Poisoned implements Status {
    technicalName: string = 'poisoned';
	name: string = 'Poisoned';
	description: string = 'Inflicts 1 at each card drawn. Ends at the end of the battle';
	icon: string = 'game-icons:poison-bottle';
	active: boolean = false;

	public applyEffects(calledBy: 'player' | 'enemy') {
		return [
			{state: 'onStateEnter_TurnPlayerDrawingState', callback: () => this.onStateEnter_TurnPlayerDrawingState(calledBy)},
			{state: 'onStateEnter_TurnEnemyDrawingState', callback: () => this.onStateEnter_TurnEnemyDrawingState(calledBy)},
			{state: 'onStateExit_BattleWonState', callback: () => this.onStateExit_BattleWonState(calledBy)},
		]
	}

	public onStateEnter_TurnPlayerDrawingState(calledBy: 'player' | 'enemy') {
		this.active = true;

		gameStore.inflictDamagesToPlayer(1);

		delay(1000).then(() => {
			this.active = false;
		});
	}

	public onStateEnter_TurnEnemyDrawingState(calledBy: 'player' | 'enemy') {
		this.active = true;

		gameStore.inflictDamagesToEnemy(1);

		delay(1000).then(() => {
			this.active = false;
		});
	}

	public onStateExit_BattleWonState(calledBy: 'player' | 'enemy') {
		if(calledBy === 'player'){
			playerSideEffectsStore.update((sideEffects: Array<Status | ContinuousEffect>) => {
				return sideEffects.filter((effect) => effect.technicalName !== this.technicalName);
			});

			return;
		}

		enemySideEffectsStore.update((sideEffects: Array<Status | ContinuousEffect>) => {
			return sideEffects.filter((effect) => effect.technicalName !== this.technicalName);
		});
	}

}