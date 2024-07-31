import type { Face, Suit } from '$lib/models/card/types';
import { Enemy, type EnemyInterface } from '$lib/models/characters/enemies';
import { EnnemyType } from '$lib/models/characters/types';
import Vampirism from '$lib/models/effects/passiveAbility/vampirism';
import { Discard } from '$lib/models/discard/model';
import { getRandomSuit } from '$lib/models/card/model';
import BreastplateArmor from '$lib/models/items/armor/breastplateArmor';

export default class GiantCrab extends Enemy implements EnemyInterface {
	minAttack: number;
	type: EnnemyType;

	constructor() {
		super();

		this.make();
	}

	make() {
		const deckSuits: Suit[] = [getRandomSuit()];
		const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

		this.name = 'Giant crab';
		this.technicalName = 'giantCrab';
		this.maxHealth = 7;
		this.currentHealth = 7;
		this.minAttack = 12;
		this.level = 1;
		this.type = EnnemyType.miniboss;
		this.deck.generateDeck(deckSuits, deckValues);
		this.passiveAbilities = [];
		this.discard = new Discard();
		this.inventory = [];
		this.status = [];
		this.armors = [new BreastplateArmor()];
	}
}
