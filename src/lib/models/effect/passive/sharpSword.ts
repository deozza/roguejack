import { gameStore } from '$lib/stores/game';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import { delay } from '$lib/utils';
import type { Rarities } from '../raritiesType';
import DefaultEffect from './defaultEffect';

export default class SharpSword  extends DefaultEffect {
	technicalName: string = 'sharpSword';
	name: string = 'Sharp sword';
	description: string = 'Deals 1 more damage if winning hand has a spade card';
	enableOnBattleState: string = '';
	enableOnPlayerTurnState: string = 'TurnFightingState';
	enableOnEnemyTurnState: string = 'TurnFightingState';
	icon: string = 'game-icons:piercing-sword';
	rarity: Rarities = 'rare';
	active: boolean = false;

	public effect(data: object): void {
		let bonusPower: number = 0;
		if (data['user'] === 'player') {
			gameStore.update((game) => {
				if (
					game
						.getCurrentBattle()
						.getCurrentTurn()
						.playerHand.cards.some((card) => card.suit === 'spade')
				) {
					this.updateStore(true, [playerSideEffectsStore]);
					bonusPower = 1;
				}
				game.getCurrentBattle().getCurrentTurn().fight.basePowerForPlayer += bonusPower;
				return game;
			});
		} else {
			gameStore.update((game) => {
				if (
					game
						.getCurrentBattle()
						.getCurrentTurn()
						.enemyHand.cards.some((card) => card.suit === 'spade')
				) {
					this.updateStore(true, [enemySideEffectsStore]);
					bonusPower = 1;
				}
				game.getCurrentBattle().getCurrentTurn().fight.basePowerForEnemy += bonusPower;
				return game;
			});
		}

		delay(2000).then(() => {
			this.updateStore(false, [playerSideEffectsStore, enemySideEffectsStore]);
		});
	}
}
