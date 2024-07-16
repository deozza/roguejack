import type { Game } from '$lib/models/game/model';
import { get } from 'svelte/store';
import type EffectInterface from '../effectInterface';
import { gameStore } from '$lib/stores/game';

export default class Vampirism implements EffectInterface {
	name: string = 'Vampirism';
	description: string = 'Heal the amount of damages inflicted.';
	enableOnBattleState: string = 'BattlePlayingState';
	enableOnPlayerTurnState: string = 'TurnLostState';
	enableOnEnemyTurnState: string = 'TurnWonState';
	icon: string = 'game-icons:bleeding-wound';

	public effect(data: object): void {
		const game: Game = get(gameStore);
		let healNumber: number = 0;

		if (data['user'] === 'player') {
			gameStore.update((game) => {
				if (game.getCurrentBattle().getCurrentTurn().fight.playerHasWon === true) {
					healNumber = game.getCurrentBattle().getCurrentTurn().fight.baseDamageToEnemy;
					game.player.heal(healNumber);
				}
				return game;
			});
		} else {
			gameStore.update((game) => {
				if (game.getCurrentBattle().getCurrentTurn().fight.enemyHasWon === true) {
					healNumber = game.getCurrentBattle().getCurrentTurn().fight.baseDamageToPlayer;
					game.getCurrentBattle()?.enemy.heal(healNumber);
				}
				return game;
			});
		}
	}
}
