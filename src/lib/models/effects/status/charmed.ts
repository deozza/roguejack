import type { Game } from '$lib/models/game/model';
import { gameStore } from '$lib/stores/game';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import { turnMachineState } from '$lib/stores/stateMachine/turn';
import type { ContinuousEffect, Status } from '../interfaces';

export default class Charmed implements Status {
	technicalName: string = 'charmeed';
	name: string = 'Charmed';
	description: string = 'Turns damage to 0. Ends at the end of the battle. 50% chance to end at the end of the turn.';
	icon: string = 'game-icons:nested-hearts';
	active: boolean = false;
	defaultAmount: number = 1;
	currentAmount: number = 1;

	public applyEffects(calledBy: 'player' | 'enemy') {
		return [
			{ state: 'onStateEnter_TurnFightingState', callback: () => this.onStateEnter_TurnFightingState(calledBy) },
			{
				state: 'onStateExit_TurnDamageState',
				callback: () => this.couldRemoveStatus(calledBy)
			},
			{
				state: 'onStateExit_BattleWonState',
				callback: () => this.removeStatus(calledBy)
			}
		];
	}

	public onStateEnter_TurnFightingState(calledBy: 'player' | 'enemy') {
		if(calledBy === 'player') {
			gameStore.update((game: Game) => {
				game.getCurrentBattle().getCurrentTurn().fight.damageOfEnemy.totalDamage = 0;
				return game;
			});
		}

		if(calledBy === 'enemy') {
			gameStore.update((game: Game) => {
				game.getCurrentBattle().getCurrentTurn().fight.damageOfPlayer.totalDamage = 0;
				return game;
			});
		}
	}

	public couldRemoveStatus(calledBy: 'player' | 'enemy') {
		if(Math.random() > 0.5) {
			this.removeStatus(calledBy);
		}
	}

	public removeStatus(calledBy: 'player' | 'enemy') {
		if (calledBy === 'player') {
			playerSideEffectsStore.update((sideEffects: Array<Status | ContinuousEffect>) => {
				return sideEffects.filter((effect) => effect.technicalName !== this.technicalName);
			});

			gameStore.removeStatusFromPlayer(this);

			return;
		}

		enemySideEffectsStore.update((sideEffects: Array<Status | ContinuousEffect>) => {
			return sideEffects.filter((effect) => effect.technicalName !== this.technicalName);
		});

		gameStore.removeStatusFromEnemy(this);
	}
}
