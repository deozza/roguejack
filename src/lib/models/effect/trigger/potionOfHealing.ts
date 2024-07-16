import type EffectInterface from '../effectInterface';
import { gameStore } from '$lib/stores/game';
import type { Rarities } from './raritiesType';

export default class PotionOfHealing implements EffectInterface {
	name: string = 'Potion of healing';
	description: string = 'Restore 10% of your health.';
	enableOnBattleState: string = 'BattlePlayingState';
	enableOnPlayerTurnState: string = 'TurnPlayingState';
	enableOnEnemyTurnState: string = 'TurnPlayingState';
	icon: string = 'game-icons:potion-ball';
	rarities: Rarities = 'common';

	public effect(data: object): void {
		if (data['user'] === 'enemy') {
			gameStore.update((game) => {
				const number: number = Math.ceil(game.getCurrentBattle()?.enemy.maxHealth * 0.1);
				game.getCurrentBattle()?.enemy.heal(number);
				return game;
			});
		} else {
			gameStore.update((game) => {
				const number: number = Math.ceil(game.player.maxHealth * 0.1);
				game.player.heal(number);
				return game;
			});
		}
	}
}
