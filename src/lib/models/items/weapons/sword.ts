import { Categories, Ranges, Types } from '$lib/models/effects/enums';
import type { EffectInterface } from '$lib/models/effects/interfaces';
import { Rarities } from '../enums';
import type {  WeaponInterface } from '../interfaces';

export default class Sword implements WeaponInterface {
	technicalName: string = 'sword';
	name: string = 'Sword';
	description: string = 'Deal 5 damage to the enemy.';
	icon: string = 'game-icons:broadsword';
	rarity: Rarities = Rarities.rare;
	effects: EffectInterface[] = [];
	category: Categories = Categories.slashing;
	type: Types = Types.physical;
	range: Ranges = Ranges.close;
	
	applyEffects(): void {
		throw new Error("Method not implemented.");
	}
}
