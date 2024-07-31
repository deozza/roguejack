import type { Categories, Ranges, Types } from '$lib/models/effects/enums';
import type { EffectInterface } from '$lib/models/effects/interfaces';
import type { Rarities } from '$lib/models/items/enums';
import type { Damage } from '../damage/model';
import type { ItemTypes } from './types';

interface ItemInterface {
	id: string;
	technicalName: string;
	name: string;
	description: string;
	rarity: Rarities;
	icon: string;
	effects: EffectInterface[];
	defaultAmount: number;
	currentAmount: number;

	applyEffects(calledBy: 'player' | 'enemy'): void;
	make(): ItemTypes;
}

export interface WeaponInterface extends ItemInterface {
	category: Categories;
	type: Types;
	range: Ranges;
	baseDamage: number;
}

export interface ArmorInterface extends ItemInterface {
	applyEffects(calledBy: 'player' | 'enemy', damage: Damage | null): Damage;
	category: Categories;
	weakToType: Types[];
	weakToCategory: Categories[];
	resistantTo: Types[];
}

export interface ConsumableInterface extends ItemInterface {
	category: Categories;
	type: Types;
}

export interface ScrollInterface extends ItemInterface {
	category: Categories;
	type: Types;
	range: Ranges;
	baseDamage: number;
}

export interface AmuletInterface extends ItemInterface {
	category: Categories;
}


export function isArmor(item: ItemInterface): item is ArmorInterface {
	return (item as ArmorInterface).weakToType !== undefined;
}

