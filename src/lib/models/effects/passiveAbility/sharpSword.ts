import type { Game } from '$lib/models/game/model';
import { get } from 'svelte/store';
import type { ContinuousEffect } from '../interfaces';
import { gameStore } from '$lib/stores/game';
import { delay } from '$lib/utils';

export default class SharpSword implements ContinuousEffect {
	id: string = crypto.randomUUID();
	technicalName: string = 'sharpSword';
	name: string = 'Sharp sword';
	description: string = 'Deals 1 more damage if winning hand has a spade card';
	icon: string = 'game-icons:piercing-sword';
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
			if (
				game
					.getCurrentBattle()
					?.getCurrentTurn()
					?.enemyHand.cards.filter((card) => card.suit === 'spade').length === 0
			) {
				this.active = true;

				gameStore.update((game: Game) => {
					game.getCurrentBattle().getCurrentTurn().fight.bonusValueForEnemy += 1;
					return game;
				});

				delay(1000).then(() => {
					this.active = false;
				});
			}
			return;
		}

		if (
			game
				.getCurrentBattle()
				?.getCurrentTurn()
				?.playerHand.cards.filter((card) => card.suit === 'spade').length === 0
		) {
			this.active = true;

			gameStore.update((game: Game) => {
				game.getCurrentBattle().getCurrentTurn().fight.bonusValueForPlayer += 1;
				return game;
			});

			delay(1000).then(() => {
				this.active = false;
			});
		}
	}
}
