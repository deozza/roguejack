import { gameStore } from '$lib/stores/game';
import type { Rarities } from '../raritiesType';
import type { HealingTriggerEffectInterface } from '../interfaces';
import { EffectType } from '../types';

export default class PotionOfHealing implements HealingTriggerEffectInterface {
	technicalName: string = 'potionOfHealing';
	name: string = 'Potion of healing';
	description: string = 'Restore 10% of your health.';
	enableOnBattleState: string = 'BattlePlayingState';
	enableOnPlayerTurnState: string = 'TurnPlayingState';
	enableOnEnemyTurnState: string = 'TurnPlayingState';
	icon: string = 'game-icons:potion-ball';
	rarity: Rarities = 'common';
	effectType: EffectType = EffectType.physical;

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
