import { gameStore } from '$lib/stores/game';
import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
import { delay } from '$lib/utils';
import { EffectType } from '../types';
import DefaultEffect from './defaultEffect';

export default class Vampirism extends DefaultEffect {
	technicalName: string = 'vampirism';
	name: string = 'Vampirism';
	description: string = 'Heal the amount of damages inflicted.';
	enableOnBattleState: string = '';
	enableOnPlayerTurnState: string = 'TurnFightingState';
	enableOnEnemyTurnState: string = 'TurnFightingState';
	icon: string = 'game-icons:bleeding-wound';
	active: boolean = false;
	effectType: EffectType = EffectType.magical;

	public effect(data: object): void {
		let healNumber: number = 0;

		if (data['user'] === 'player') {
			gameStore.update((game) => {
				if (game.getCurrentBattle()?.getCurrentTurn().fight.playerHasWon === false) {
					return game;
				}
				this.updateStore(true, [playerSideEffectsStore]);
				healNumber = game.getCurrentBattle().getCurrentTurn().fight.baseDamageToEnemy;
				game.player.heal(healNumber);
				return game;
			});
		} else {
			gameStore.update((game) => {
				if (game.getCurrentBattle()?.getCurrentTurn().fight.enemyHasWon === false) {
					return game;
				}
				this.updateStore(true, [enemySideEffectsStore]);
				healNumber = game.getCurrentBattle().getCurrentTurn().fight.baseDamageToPlayer;
				game.getCurrentBattle()?.enemy.heal(healNumber);
				return game;
			});
		}

		delay(2000).then(() => {
			this.updateStore(false, [playerSideEffectsStore, enemySideEffectsStore]);
		});
	}
}
