import type { Face, Suit } from '$lib/models/card/types';
import { Enemy, type EnemyInterface } from '$lib/models/characters/enemies';
import { EnnemyType } from '$lib/models/characters/types';
import SharpSword from '$lib/models/effects/passiveAbility/sharpSword';
import { Discard } from '$lib/models/discard/model';
import { getRandomSuit } from '$lib/models/card/model';

export default class Kobold extends Enemy implements EnemyInterface {
	minAttack: number;
	type: EnnemyType;

	constructor() {
		super();

		this.make();
	}

	make() {
		const deckSuits: Suit[] = ['spade', getRandomSuit()];
		const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

		this.name = 'Kobold';
		this.technicalName = 'kobold';
		this.maxHealth = 10;
		this.currentHealth = 10;
		this.minAttack = 14;
		this.level = 2;
		this.type = EnnemyType.miniboss;
		this.deck.generateDeck(deckSuits, deckValues);
		this.passiveAbilities = [new SharpSword()];
		this.discard = new Discard();
		this.inventory = [];
		this.status = [];
		this.armors = [];
	}
}
