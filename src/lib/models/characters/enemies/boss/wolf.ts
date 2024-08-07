import type { Face, Suit } from '$lib/models/card/types';
import { Enemy, type EnemyInterface } from '$lib/models/characters/enemies';
import { EnnemyType } from '$lib/models/characters/types';
import InflictWound from '$lib/models/effects/passiveAbility/inflictWound';
import { Discard } from '$lib/models/discard/model';
import { getRandomSuit } from '$lib/models/card/model';

export default class Wolf extends Enemy implements EnemyInterface {
	minAttack: number;
	type: EnnemyType;

	constructor() {
		super();

		this.make();
	}

	make() {
		const deckSuits: Suit[] = [getRandomSuit(), getRandomSuit()];
		const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

		this.name = 'Wolf';
		this.technicalName = 'wolf';
		this.maxHealth = 15;
		this.currentHealth = 15;
		this.minAttack = 11;
		this.level = 1;
		this.type = EnnemyType.boss;
		this.deck.generateDeck(deckSuits, deckValues);
		this.passiveAbilities = [new InflictWound()];
		this.discard = new Discard();
		this.inventory = [];
		this.status = [];
		this.armors = [];
	}
}
