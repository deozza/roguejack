import type { Game } from "$lib/models/game/model";
import { get } from "svelte/store";
import type { ContinuousEffect } from "../interfaces";
import { gameStore } from "$lib/stores/game";
import { delay } from "$lib/utils";

export default class Vampirism implements ContinuousEffect {
	id: string = crypto.randomUUID();
	technicalName: string = 'vampirism';
	name: string = 'Vampirism';
	description: string = 'Heal the amount of damages inflicted.';
	icon: string = 'game-icons:bleeding-wound';
	active: boolean = false;

	public applyEffects(calledBy: 'player' | 'enemy') {
		return [
			{state: 'onStateExit_TurnFightingState', callback: () => this.onStateExit_TurnFightingState(calledBy)},
		]
	}

	public onStateExit_TurnFightingState(calledBy: 'player' | 'enemy') {
		this.active = true;
		const game: Game = get(gameStore);
		if(calledBy === 'enemy'){
			if(game.getCurrentBattle()?.getCurrentTurn()?.fight.enemyHasWon) {
				
				gameStore.update((game: Game) => {
					game.getCurrentBattle()?.enemy.heal(game.getCurrentBattle().getCurrentTurn().fight.totalDamageToPlayer);
					return game;
				});
	
				delay(1000).then(() => {
					this.active = false;
				});
			}
			return;	
		}


		if(game.getCurrentBattle()?.getCurrentTurn()?.fight.playerHasWon) {
				
			gameStore.update((game: Game) => {
				game.player.heal(game.getCurrentBattle().getCurrentTurn().fight.totalDamageToEnemy);
				return game;
			});

			delay(1000).then(() => {
				this.active = false;
			});
		}
		return;

	}
}
