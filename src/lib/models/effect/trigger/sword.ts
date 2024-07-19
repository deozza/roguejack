import { gameStore } from '$lib/stores/game';
import type { DamageTriggerEffectInterface } from '../interfaces';
import type { Rarities } from '../raritiesType';
import { DamageType, EffectRange, EffectType } from '../types';

export default class Sword implements DamageTriggerEffectInterface {
	technicalName: string = 'sword';
	name: string = 'Sword';
	description: string = 'Deal 5 damage to the enemy.';
	enableOnBattleState: string = 'BattlePlayingState';
	enableOnPlayerTurnState: string = 'TurnPlayingState';
	enableOnEnemyTurnState: string = 'TurnPlayingState';
	icon: string = 'game-icons:broadsword';
	rarity: Rarities = 'rare';
	damageType: DamageType = DamageType.piercing;
	effectRange: EffectRange = EffectRange.close;
	effectType: EffectType = EffectType.physical;

	public effect(data: object): void {
		if (data['user'] === 'player') {
			gameStore.update((game) => {
				game.getCurrentBattle()?.enemy.takeDamage(5);
				return game;
			});
		} else {
			gameStore.update((game) => {
				game.player.takeDamage(5);
				return game;
			});
		}
	}
}
