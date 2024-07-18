import { gameStore } from '$lib/stores/game';
import type { Rarities } from '../raritiesType';
import { delay } from '$lib/utils';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import DefaultEffect from './defaultEffect';

export default class Undead  extends DefaultEffect {
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
					this.updateStore(true, [playerSideEffectsStore]);
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
					this.updateStore(true, [enemySideEffectsStore]);
					game.getCurrentBattle().getCurrentTurn().fight.multiplierForPlayer = 0;
				}
				return game;
			});
		}

		delay(2000).then(() => {
			this.updateStore(false, [playerSideEffectsStore, enemySideEffectsStore]);
		});
	}
}
