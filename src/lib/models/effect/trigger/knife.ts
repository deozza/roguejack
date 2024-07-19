import { gameStore } from '$lib/stores/game';
import type { Rarities } from '../raritiesType';
import type { DamageTriggerEffectInterface } from '../interfaces';
import { DamageType, EffectRange, EffectType } from '../types';

export default class Knife implements DamageTriggerEffectInterface {
	technicalName: string = 'knife';
	name: string = 'Knife';
	description: string = 'Deal 1 damage to the enemy.';
	enableOnBattleState: string = 'BattlePlayingState';
	enableOnPlayerTurnState: string = 'TurnPlayingState';
	enableOnEnemyTurnState: string = 'TurnPlayingState';
	icon: string = 'game-icons:bowie-knife';
	rarity: Rarities = 'common';
	damageType: DamageType = DamageType.piercing;
	effectRange: EffectRange = EffectRange.close;
	effectType: EffectType = EffectType.physical;

	public effect(data: object): void {
		if (data['user'] === 'player') {
			gameStore.update((game) => {
				game.getCurrentBattle()?.enemy.takeDamage(1);
				return game;
			});
		} else {
			gameStore.update((game) => {
				game.player.takeDamage(1);
				return game;
			});
		}
	}
}
