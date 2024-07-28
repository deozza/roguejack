import type { Game } from '$lib/models/game/model';
import { gameStore } from '$lib/stores/game';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import type { ContinuousEffect, Status } from '../interfaces';

export default class Bleeding implements Status {
	technicalName: string = 'bleeding';
	name: string = 'Bleeding';
	description: string = 'Inflicts 1 at the start of the turn. Ends at the end of the battle';
	icon: string = 'game-icons:blood';
	active: boolean = false;

	public applyEffects(calledBy: 'player' | 'enemy') {
		return [
			{
				state: 'onStateEnter_TurnPlayerInitState',
				callback: () => this.onStateEnter_TurnPlayerInitState(calledBy)
			},
			{
				state: 'onStateEnter_TurnEnemyInitState',
				callback: () => this.onStateEnter_TurnEnemyInitState(calledBy)
			},
			{
				state: 'onStateExit_BattleWonState',
				callback: () => this.onStateExit_BattleWonState(calledBy)
			}
		];
	}

	public onStateEnter_TurnPlayerInitState(calledBy: 'player' | 'enemy') {
		if (calledBy === 'enemy') {
			return;
		}
		gameStore.inflictDamagesToPlayer(1);
	}

	public onStateEnter_TurnEnemyInitState(calledBy: 'player' | 'enemy') {
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
