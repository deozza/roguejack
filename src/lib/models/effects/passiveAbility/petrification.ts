import type { Game } from '$lib/models/game/model';
import { get } from 'svelte/store';
import type { ContinuousEffect } from '../interfaces';
import { gameStore } from '$lib/stores/game';
import Paralyzed from '../status/paralyzed';

export default class Petrification implements ContinuousEffect {
	id: string = crypto.randomUUID();
	technicalName: string = 'petrification';
	name: string = 'Petrification';
	description: string = '30% chances to paralyse the enemy when attacking';
	icon: string = 'game-icons:stone-bust';
	active: boolean = false;

	public applyEffects(calledBy: 'player' | 'enemy') {
		return [
			{
				state: 'onStateEnter_TurnLostState',
				callback: () => this.onStateEnter_TurnLostState(calledBy)
			}
		];
	}

	public onStateEnter_TurnLostState(calledBy: 'player' | 'enemy') {
		const game: Game = get(gameStore);
		if (calledBy === 'enemy') {
			if (
				game.getCurrentBattle()?.getCurrentTurn()?.enemyHand.value >
				game.getCurrentBattle()?.getCurrentTurn()?.playerHand.value
			) {

				if(Math.random() > 0.3) return;

				gameStore.addStatusToPlayer(new Paralyzed());
			}
			return;
		}

		if (
			game.getCurrentBattle()?.getCurrentTurn()?.playerHand.value >
			game.getCurrentBattle()?.getCurrentTurn()?.enemyHand.value
		) {
			if(Math.random() > 0.3) return;

			gameStore.addStatusToEnemy(new Paralyzed());
		}

		return;
	}
}
