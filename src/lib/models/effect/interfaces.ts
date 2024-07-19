import type { Rarities } from './raritiesType';
import type { DamageType, EffectRange, EffectType, HealingType } from './types';

interface EffectInterface {
	technicalName: string;
	name: string;
	description: string;
	enableOnBattleState: string;
	enableOnPlayerTurnState: string;
	enableOnEnemyTurnState: string;
	icon: string;
	effectType: EffectType;

	effect(data: object): void;
}

interface TriggerEffectInterface extends EffectInterface {
	rarity: Rarities;
}

export interface DamageTriggerEffectInterface extends TriggerEffectInterface {
	damageType: DamageType;
	effectRange: EffectRange;
}

export interface HealingTriggerEffectInterface extends TriggerEffectInterface {
}


export interface PassiveEffectInterface extends EffectInterface {
	active: boolean;
}