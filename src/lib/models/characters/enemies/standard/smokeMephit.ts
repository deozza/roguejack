import type { Face, Suit } from '$lib/models/card/types';
import { Enemy, type EnemyInterface } from '$lib/models/characters/enemies';
import { EnnemyType } from '$lib/models/characters/types';
import { Discard } from '$lib/models/discard/model';
import { getRandomSuit } from '$lib/models/card/model';
import PlateArmor from '$lib/models/items/armor/plateArmor';
import SmokeBurst from '$lib/models/effects/passiveAbility/smokeBurst';

export default class SmokeMephit extends Enemy implements EnemyInterface {
	minAttack: number;
	type: EnnemyType;

	constructor() {
		super();
		this.make();
	}

	make() {
		const deckSuits: Suit[] = [getRandomSuit(), getRandomSuit()];
		const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

		this.name = 'Smoke Mephit';
		this.technicalName = 'smokeMephit';
		this.maxHealth = 15;
		this.currentHealth = 15;
		this.minAttack = 12;
		this.level = 1;
		this.type = EnnemyType.standard;
		this.deck.generateDeck(deckSuits, deckValues);
		this.passiveAbilities = [];
		this.discard = new Discard();
		this.inventory = [];
		this.status = [];
		this.armors = [];
		this.passiveAbilities = [new SmokeBurst()];
	}
}
