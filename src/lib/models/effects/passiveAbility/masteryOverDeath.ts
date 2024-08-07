import type { Game } from '$lib/models/game/model';
import { get } from 'svelte/store';
import type { ContinuousEffect } from '../interfaces';
import { gameStore } from '$lib/stores/game';

export default class MasteryOverDeath implements ContinuousEffect {
	id: string = crypto.randomUUID();
	technicalName: string = 'masteryOverDeath';
	name: string = 'Mastery Over Death';
	description: string = 'Deal 1 more base power when there is at least 10 cards in the discard.';
	icon: string = 'game-icons:graveyard';
	active: boolean = false;

	public applyEffects(calledBy: 'player' | 'enemy') {
		return [
			{
				state: 'onStateEnter_TurnFightingState',
				callback: () => this.onStateEnter_TurnFightingState(calledBy)
			}
		];
	}

	public onStateEnter_TurnFightingState(calledBy: 'player' | 'enemy') {
		const game: Game = get(gameStore);
		if (calledBy === 'enemy') {
			if (game.getCurrentBattle()?.enemy.discard.cards.length >= 10) {
				gameStore.update((game: Game) => {
					game.getCurrentBattle().getCurrentTurn().fight.damageOfEnemy.bonusDamage += 1;
					return game;
				});
			}
			return;
		}

		if (game.player.discard.cards.length >= 10) {
			gameStore.update((game: Game) => {
				game.getCurrentBattle().getCurrentTurn().fight.damageOfPlayer.bonusDamage += 1;
				return game;
			});
		}
	}
}
