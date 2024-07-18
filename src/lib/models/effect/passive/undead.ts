import type EffectInterface from '../effectInterface';
import { gameStore } from '$lib/stores/game';
import type { Rarities } from '../raritiesType';

export default class Undead implements EffectInterface {
	technicalName: string = 'undead';
	name: string = 'Undead';
	description: string = 'Ignore damages if enemy hand does not contain club cards.';
	enableOnBattleState: string = '';
	enableOnPlayerTurnState: string = 'TurnFightingState';
	enableOnEnemyTurnState: string = 'TurnFightingState';
	icon: string = 'game-icons:half-dead';
	rarity: Rarities = 'rare';
	active: boolean = false;

	public effect(data: object): void {
		if (data['user'] === 'player') {
			gameStore.update((game) => {
				if (
					game
						.getCurrentBattle()
						.getCurrentTurn()
						.enemyHand.cards.some((card) => card.suit === 'club') === false
				) {
					game.getCurrentBattle().getCurrentTurn().fight.multiplierForEnemy = 0;
				}
				return game;
			});
		} else {
			gameStore.update((game) => {
				if (
					game
						.getCurrentBattle()
						.getCurrentTurn()
						.playerHand.cards.some((card) => card.suit === 'club') === false
				) {
					game.getCurrentBattle().getCurrentTurn().fight.multiplierForPlayer = 0;
				}
				return game;
			});
		}
	}
}
