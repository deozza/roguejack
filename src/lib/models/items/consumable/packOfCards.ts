import { Card, generateRandomCard } from "$lib/models/card/model";
import { Categories, Types } from "$lib/models/effects/enums";
import type { EffectInterface } from "$lib/models/effects/interfaces";
import { Rarities } from "$lib/models/items/enums";
import type { ConsumableInterface } from "$lib/models/items/interfaces";
import { gameStore } from "$lib/stores/game";

export default class PackOfCards  implements ConsumableInterface {
	id: string = crypto.randomUUID();
	category: Categories = Categories.neutral;
	type: Types = Types.physical;
	effects: EffectInterface[] = [];
	technicalName: string = 'packOfCards';
	name: string = 'Pack of cards';
	description: string = 'Add 3 random cards to your deck.';
	icon: string = 'game-icons:card-random';
	rarity: Rarities = Rarities.common;
	defaultAmount =  1;
	currentAmount: number = 1;

	applyEffects(calledBy: 'player' | 'enemy'): void {
		for(let i = 0; i < 3; i++) {
			const card = generateRandomCard();
			gameStore.addCardToDeck(card, calledBy);
		}

		gameStore.shuffleDeck(calledBy);
	}

}
