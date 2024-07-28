import type { Game } from '$lib/models/game/model';
import { get } from 'svelte/store';
import type { ContinuousEffect } from '../interfaces';
import { gameStore } from '$lib/stores/game';

export default class Berserker implements ContinuousEffect {
	id: string = crypto.randomUUID();
	technicalName: string = 'berserker';
	name: string = 'Berserker';
	description: string = 'Deal 1 more base power when low health.';
	icon: string = 'game-icons:enrage';
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
			const character = game.getCurrentBattle()?.enemy;
			if (character?.currentHealth / character?.maxHealth <= 0.5) {

				gameStore.update((game: Game) => {
					game.getCurrentBattle().getCurrentTurn().fight.bonusValueForEnemy += 2;
					return game;
				});
			}
			return;
		}

		const character = game.player;
		if (character.currentHealth / character.maxHealth <= 0.5) {

			gameStore.update((game: Game) => {
				game.getCurrentBattle().getCurrentTurn().fight.bonusValueForPlayer += 2;
				return game;
			});
		}
	}
}
