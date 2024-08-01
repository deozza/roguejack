import type { Face, Suit } from '$lib/models/card/types';
import { Enemy, type EnemyInterface } from '$lib/models/characters/enemies';
import { EnnemyType } from '$lib/models/characters/types';
import { Discard } from '$lib/models/discard/model';
import { getRandomSuit } from '$lib/models/card/model';
import TwoHandedAxe from '$lib/models/items/weapons/twoHandedAxe';
import BreastplateArmor from '$lib/models/items/armor/breastplateArmor';

export default class Centaur extends Enemy implements EnemyInterface {
	minAttack: number;
	type: EnnemyType;

	constructor() {
		super();
		this.make();
	}

	make() {
		const deckSuits: Suit[] = [getRandomSuit()];
		const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

		this.name = 'Centaur';
		this.technicalName = 'centaur';
		this.maxHealth = 20;
		this.currentHealth = 20;
		this.minAttack = 14;
		this.level = 4;
		this.type = EnnemyType.miniboss;
		this.deck.generateDeck(deckSuits, deckValues);
		this.discard = new Discard();
		this.inventory = [new TwoHandedAxe()];
		this.status = [];
		this.armors = [new BreastplateArmor()];
	}
}
