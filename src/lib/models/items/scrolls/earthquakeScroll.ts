import { Categories, Ranges, Types } from "$lib/models/effects/enums";
import type { EffectInterface } from "$lib/models/effects/interfaces";
import { Rarities } from "../enums";
import type { ScrollInterface } from "../interfaces";


export default class EarthquakeScroll implements ScrollInterface {
	
	technicalName: string = 'earthquakeScroll';
	name: string = 'Earthquake scroll';
	description: string = "Deals 10 damages. Your ennemy can't play.";
	icon: string = 'game-icons:earth-spit';
	category: Categories = Categories.earth;
	type: Types = Types.magical;
	range: Ranges = Ranges.far;
	rarity: Rarities = Rarities.legendary;
	effects: EffectInterface[] = [];

	applyEffects(): void {
		throw new Error("Method not implemented.");
	}
}
