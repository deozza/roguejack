import type { Game } from '$lib/models/game/model';
import { gameStore } from '$lib/stores/game';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import type { ContinuousEffect, Status } from '../interfaces';

export default class Poisoned implements Status {
	technicalName: string = 'poisoned';
	name: string = 'Poisoned';
	description: string = 'Inflicts 1 at each card drawn. Ends at the end of the battle';
	icon: string = 'game-icons:poison-bottle';
	active: boolean = false;

	public applyEffects(calledBy: 'player' | 'enemy') {
		return [
			{
				state: 'onStateEnter_TurnPlayerDrawingState',
				callback: () => this.onStateEnter_TurnPlayerDrawingState(calledBy)
			},
			{
				state: 'onStateEnter_TurnEnemyDrawingState',
				callback: () => this.onStateEnter_TurnEnemyDrawingState(calledBy)
			},
			{
				state: 'onStateExit_BattleWonState',
				callback: () => this.onStateExit_BattleWonState(calledBy)
			}
		];
	}

	public onStateEnter_TurnPlayerDrawingState(calledBy: 'player' | 'enemy') {
		if (calledBy === 'enemy') {
			return;
		}

		gameStore.inflictDamagesToPlayer(1);
	}

	public onStateEnter_TurnEnemyDrawingState(calledBy: 'player' | 'enemy') {
		if (calledBy === 'player') {
			return;
		}
		gameStore.inflictDamagesToEnemy(1);
	}

	public onStateExit_BattleWonState(calledBy: 'player' | 'enemy') {
		if (calledBy === 'player') {
			playerSideEffectsStore.update((sideEffects: Array<Status | ContinuousEffect>) => {
				return sideEffects.filter((effect) => effect.technicalName !== this.technicalName);
			});

			gameStore.update((game: Game) => {
				game.player.status = game.player.status.filter((effect: Status) => effect.technicalName !== this.technicalName);
				return game;
			})

			return;
		}

		enemySideEffectsStore.update((sideEffects: Array<Status | ContinuousEffect>) => {
			return sideEffects.filter((effect) => effect.technicalName !== this.technicalName);
		});

		gameStore.update((game: Game) => {
			game.getCurrentBattle().enemy.status = game.getCurrentBattle().enemy.status.filter((effect: Status) => effect.technicalName !== this.technicalName);
			return game;
		})
	}
}
