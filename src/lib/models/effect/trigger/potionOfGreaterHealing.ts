import { gameStore } from '$lib/stores/game';
import type { Rarities } from '../raritiesType';
import type { HealingTriggerEffectInterface } from '../interfaces';
import { EffectType } from '../types';

export default class PotionOfGreaterHealing implements HealingTriggerEffectInterface {
	technicalName: string = 'potionOfGreaterHealing';
	name: string = 'Potion of greater healing';
	description: string = 'Restore 25% of your health.';
	enableOnBattleState: string = 'BattlePlayingState';
	enableOnPlayerTurnState: string = 'TurnPlayingState';
	enableOnEnemyTurnState: string = 'TurnPlayingState';
	icon: string = 'game-icons:potion-ball';
	rarity: Rarities = 'uncommon';
	effectType: EffectType = EffectType.physical;

	public effect(data: object): void {
		if (data['user'] === 'enemy') {
			gameStore.update((game) => {
				const number: number = Math.ceil(game.getCurrentBattle()?.enemy.maxHealth * 0.25);
				game.getCurrentBattle()?.enemy.heal(number);
				return game;
			});
		} else {
			gameStore.update((game) => {
				const number: number = Math.ceil(game.player.maxHealth * 0.25);
				game.player.heal(number);
				return game;
			});
		}
	}
}
