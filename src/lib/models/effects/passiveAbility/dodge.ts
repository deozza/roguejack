import type { Game } from '$lib/models/game/model';
import { get } from 'svelte/store';
import type { ContinuousEffect } from '../interfaces';
import { gameStore } from '$lib/stores/game';

export default class Dodge implements ContinuousEffect {
	id: string = crypto.randomUUID();
	technicalName: string = 'dodge';
	name: string = 'Dodge';
	description: string = 'Dodge the attack if 4 cards or more are used.';
	icon: string = 'game-icons:dodging';
	active: boolean = false;

	public applyEffects(calledBy: 'player' | 'enemy') {
		return [
			{
				state: 'onStateExit_TurnFightingState',
				callback: () => this.onStateExit_TurnFightingState(calledBy)
			}
		];
	}

	public onStateExit_TurnFightingState(calledBy: 'player' | 'enemy') {
		const game: Game = get(gameStore);
		if (calledBy === 'enemy') {
			if (game.getCurrentBattle()?.getCurrentTurn()?.fight.playerHasWon) {
				if (game.getCurrentBattle()?.getCurrentTurn()?.playerHand.cards.length >= 4) {
					gameStore.update((game: Game) => {
						game.getCurrentBattle().getCurrentTurn().fight.damageOfPlayer.totalDamage = 0;
						return game;
					});
				}
			}
			return;
		}

		if (game.getCurrentBattle()?.getCurrentTurn()?.fight.enemyHasWon) {
			if (game.getCurrentBattle()?.getCurrentTurn()?.enemyHand.cards.length >= 4) {
				gameStore.update((game: Game) => {
					game.getCurrentBattle().getCurrentTurn().fight.damageOfEnemy.totalDamage = 0;
					return game;
				});
			}
		}
	}
}
