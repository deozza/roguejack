import { gameStore } from "$lib/stores/game";
import { enemySideEffectsStore, playerSideEffectsStore } from "$lib/stores/sideEffects";
import { delay } from "$lib/utils";
import type { ContinuousEffect, Status } from "../interfaces";

export default class Bleeding implements Status {
    technicalName: string = 'bleeding';
	name: string = 'Bleeding';
	description: string = 'Inflicts 1 at the start of the turn. Ends at the end of the battle';
	icon: string = 'game-icons:blood';
	active: boolean = false;

	public applyEffects(calledBy: 'player' | 'enemy') {
		return [
			{state: 'onStateEnter_TurnPlayerInitState', callback: () => this.onStateEnter_TurnPlayerInitState(calledBy)},
			{state: 'onStateEnter_TurnEnemyInitState', callback: () => this.onStateEnter_TurnEnemyInitState(calledBy)},
			{state: 'onStateExit_BattleWonState', callback: () => this.onStateExit_BattleWonState(calledBy)},
		]
	}

	public onStateEnter_TurnPlayerInitState(calledBy: 'player' | 'enemy') {
		if(calledBy === 'enemy'){
			return;
		}
		this.active = true;

		gameStore.inflictDamagesToPlayer(1);

		delay(1000).then(() => {
			this.active = false;
		});
	}

	public onStateEnter_TurnEnemyInitState(calledBy: 'player' | 'enemy') {
		if(calledBy === 'player'){
			return;
		}
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