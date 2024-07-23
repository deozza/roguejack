import type { Game } from "$lib/models/game/model";
import { get } from "svelte/store";
import type { ContinuousEffect } from "../interfaces";
import { gameStore } from "$lib/stores/game";
import { delay } from "$lib/utils";

export default class Undead implements ContinuousEffect {
	id: string = crypto.randomUUID();
	technicalName: string = 'undead';
	name: string = 'Undead';
	description: string = 'Ignore damages if enemy hand does not contain club cards.';
	icon: string = 'game-icons:half-dead';
	active: boolean = false;

	public applyEffects(calledBy: 'player' | 'enemy') {
		return [
			{state: 'onStateExit_TurnFightingState', callback: () => this.onStateExit_TurnFightingState(calledBy)},
		]
	}

	public onStateExit_TurnFightingState(calledBy: 'player' | 'enemy') {
		const game: Game = get(gameStore);
		if(calledBy === 'enemy'){
			if(game.getCurrentBattle()?.getCurrentTurn()?.fight.playerHasWon) {
				if(game.getCurrentBattle()?.getCurrentTurn()?.playerHand.cards.filter(card => card.suit === 'club').length === 0) {
					
					this.active = true;
					
					gameStore.update((game: Game) => {
						game.getCurrentBattle().getCurrentTurn().fight.totalDamageToEnemy = 0;
						return game;
					});

					delay(1000).then(() => {
						this.active = false;
					});
				}
			}
			return;	
		}


		if(game.getCurrentBattle()?.getCurrentTurn()?.fight.enemyHasWon) {
			if(game.getCurrentBattle()?.getCurrentTurn()?.enemyHand.cards.filter(card => card.suit === 'club').length === 0) {
				
				this.active = true;
				
				gameStore.update((game: Game) => {
					game.getCurrentBattle().getCurrentTurn().fight.totalDamageToPlayer = 0;
					return game;
				});

				delay(1000).then(() => {
					this.active = false;
				});
			}
		}

	}
}
