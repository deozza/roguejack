import type { Face, Suit } from '$lib/models/card/types';
import { type Enemy } from '$lib/models/characters/enemies';
import { EnnemyType } from '$lib/models/characters/types';
import { DefaultCharacter } from '$lib/models/characters';
import { Discard } from '$lib/models/discard/model';

export default class Owlbear extends DefaultCharacter implements Enemy {
	minAttack: number;
	type: EnnemyType;

	constructor() {
		super();

		this.make();
	}

	make() {
		const deckSuits: Suit[] = ['spade', 'heart'];
		const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

		this.name = 'Owlbear';
		this.technicalName = 'owlbear';
		this.maxHealth = 20;
		this.currentHealth = 20;
		this.minAttack = 14;
		this.level = 2;
		this.type = EnnemyType.boss;
		this.deck.generateDeck(deckSuits, deckValues);
		this.discard = new Discard();
	}
}
