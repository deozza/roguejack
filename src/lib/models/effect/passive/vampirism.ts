import type EffectInterface from '../effectInterface';
import { gameStore } from '$lib/stores/game';
import type { Rarities } from '../raritiesType';

export default class Vampirism implements EffectInterface {
	technicalName: string = 'vampirism';
	name: string = 'Vampirism';
	description: string = 'Heal the amount of damages inflicted.';
	enableOnBattleState: string = '';
	enableOnPlayerTurnState: string = 'TurnFightingState';
	enableOnEnemyTurnState: string = 'TurnFightingState';
	icon: string = 'game-icons:bleeding-wound';
	rarity: Rarities = 'rare';

	public effect(data: object): void {
		let healNumber: number = 0;

		if (data['user'] === 'player') {
			gameStore.update((game) => {
				if(game.getCurrentBattle()?.getCurrentTurn().fight.playerHasWon === false) {
					return game;
				}
				healNumber = game.getCurrentBattle().getCurrentTurn().fight.baseDamageToEnemy;
				game.player.heal(healNumber);
				return game;
			});
		} else {
			gameStore.update((game) => {
				if(game.getCurrentBattle()?.getCurrentTurn().fight.enemyHasWon === false) {
					return game;
				}
				healNumber = game.getCurrentBattle().getCurrentTurn().fight.baseDamageToPlayer;
				game.getCurrentBattle()?.enemy.heal(healNumber);
				return game;
			});
		}
	}
}
