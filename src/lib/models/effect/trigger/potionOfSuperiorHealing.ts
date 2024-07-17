import type EffectInterface from '../effectInterface';
import { gameStore } from '$lib/stores/game';
import type { Rarities } from '../raritiesType';

export default class PotionOfSuperiorfHealing implements EffectInterface {
	technicalName: string = 'potionOfSuperiorHealing';
	name: string = 'Potion of greater healing';
	description: string = 'Restore 50% of your health.';
	enableOnBattleState: string = 'BattlePlayingState';
	enableOnPlayerTurnState: string = 'TurnPlayingState';
	enableOnEnemyTurnState: string = 'TurnPlayingState';
	icon: string = 'game-icons:potion-ball';
	rarity: Rarities = 'rare';

	public effect(data: object): void {
		if (data['user'] === 'enemy') {
			gameStore.update((game) => {
				const number: number = Math.ceil(game.getCurrentBattle()?.enemy.maxHealth * 0.5);
				game.getCurrentBattle()?.enemy.heal(number);
				return game;
			});
		} else {
			gameStore.update((game) => {
				const number: number = Math.ceil(game.player.maxHealth * 0.5);
				game.player.heal(number);
				return game;
			});
		}
	}
}
