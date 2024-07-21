import { Categories, Types } from "$lib/models/effects/enums";
import type { EffectInterface } from "$lib/models/effects/interfaces";
import { Rarities } from "../enums";
import type { ConsumableInterface } from "../interfaces";

export default class PackOfCards  implements ConsumableInterface {
	category: Categories = Categories.neutral;
	type: Types = Types.physical;
	effects: EffectInterface[] = [];
	technicalName: string = 'packOfCards';
	name: string = 'Pack of cards';
	description: string = 'Add 3 random cards to your deck.';
	icon: string = 'game-icons:card-random';
	rarity: Rarities = Rarities.common;

	applyEffects(): void {
		throw new Error("Method not implemented.");
	}

}
