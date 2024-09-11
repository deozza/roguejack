import type { Face, Suit } from '$lib/models/card/types';
import { Enemy, type EnemyInterface } from '$lib/models/characters/enemies';
import { EnnemyType } from '$lib/models/characters/types';
import { Discard } from '$lib/models/discard/model';

export default class Skeleton extends Enemy implements EnemyInterface {
	minAttack: number;
	type: EnnemyType;

	constructor() {
		super();
		this.make();
	}

	make() {
		const deckSuits: Suit[] = ['club'];
		const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

		this.name = 'Skeleton';
		this.technicalName = 'skeleton';
		this.maxHealth = 5;
		this.currentHealth = 5;
		this.minAttack = 13;
		this.level = 2;
		this.type = EnnemyType.standard;
		this.deck.generateDeck(deckSuits, deckValues);
		this.passiveAbilities = [];
		this.discard = new Discard();
		this.inventory = [];
		this.status = [];
		this.armors = [];
	}
}
