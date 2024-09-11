import type { Face, Suit } from '$lib/models/card/types';
import { Enemy, type EnemyInterface } from '$lib/models/characters/enemies';
import { EnnemyType } from '$lib/models/characters/types';
import Undead from '$lib/models/effects/passiveAbility/undead';
import { Discard } from '$lib/models/discard/model';
import { getRandomSuit } from '$lib/models/card/model';
import TwoHandedAxe from '$lib/models/items/weapons/twoHandedAxe';
import Intimidation from '$lib/models/effects/passiveAbility/intimidation';
import LeatherArmor from '$lib/models/items/armor/leatherArmor';

export default class SeaHag extends Enemy implements EnemyInterface {
	minAttack: number;
	type: EnnemyType;

	constructor() {
		super();

		this.make();
	}

	make() {
		const deckSuits: Suit[] = [getRandomSuit(), getRandomSuit()];
		const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

		this.name = 'Sea hag';
		this.technicalName = 'seaHag';
		this.maxHealth = 20;
		this.currentHealth = 20;
		this.minAttack = 13;
		this.level = 4;
		this.type = EnnemyType.miniboss;
		this.deck.generateDeck(deckSuits, deckValues);
		this.passiveAbilities = [new Undead()];
		this.discard = new Discard();
		this.inventory = [];
		this.status = [];
		this.armors = [new LeatherArmor()];
		this.passiveAbilities = [new Intimidation()];
	}
}
