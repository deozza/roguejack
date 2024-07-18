import type EffectInterface from '../effectInterface';
import { gameStore } from '$lib/stores/game';
import type { Rarities } from '../raritiesType';

export default class Undead implements EffectInterface {
	technicalName: string = 'undead';
	name: string = 'Undead';
	description: string = 'Ignore damages from red cards';
	enableOnBattleState: string = 'BattlePlayingState';
	enableOnPlayerTurnState: string = 'TurnDamageState';
	enableOnEnemyTurnState: string = 'TurnDamageState';
	icon: string = 'game-icons:half-dead';
	rarity: Rarities = 'rare';

	public effect(data: object): void {
		if (data['user'] === 'player') {
			gameStore.update((game) => {
				if (
					game
						.getCurrentBattle()
						.getCurrentTurn()
						.enemyHand.cards.some((card) => card.suit === 'heart' || card.suit === 'diamond')
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
						.playerHand.cards.some((card) => card.suit === 'heart' || card.suit === 'diamond')
				) {
					bonusPower = 1;
				}
				game.getCurrentBattle().getCurrentTurn().fight.multiplierForPlayer = 0;
				return game;
			});
		}
	}
}
