import { gameStore } from '$lib/stores/game';
import type { Rarities } from '../raritiesType';
import type { DamageTriggerEffectInterface,} from '../interfaces';
import { DamageType, EffectRange, EffectType } from '../types';

export default class Dagger implements DamageTriggerEffectInterface {
	technicalName: string = 'dagger';
	name: string = 'Dagger';
	description: string = 'Deal 3 damage to the enemy.';
	enableOnBattleState: string = 'BattlePlayingState';
	enableOnPlayerTurnState: string = 'TurnPlayingState';
	enableOnEnemyTurnState: string = 'TurnPlayingState';
	icon: string = 'game-icons:plain-dagger';
	rarity: Rarities = 'uncommon';
	damageType: DamageType = DamageType.piercing;
	effectRange: EffectRange = EffectRange.close;
	effectType: EffectType = EffectType.physical;

	public effect(data: object): void {
		if (data['user'] === 'player') {
			gameStore.update((game) => {
				game.getCurrentBattle()?.enemy.takeDamage(3);
				return game;
			});
		} else {
			gameStore.update((game) => {
				game.player.takeDamage(3);
				return game;
			});
		}
	}
}
