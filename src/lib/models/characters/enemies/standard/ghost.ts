import type { Face, Suit } from '$lib/models/card/types';
import { type Enemy } from '$lib/models/characters/enemies';
import { EnnemyType } from '$lib/models/characters/types';
import { DefaultCharacter } from '$lib/models/characters';
import Intimidation from '$lib/models/effects/passiveAbility/intimidation';
import { Discard } from '$lib/models/discard/model';

export default class Ghost extends DefaultCharacter implements Enemy {
	minAttack: number;
	type: EnnemyType;

	constructor() {
		super();
		this.make();
	}

	make() {
		const deckSuits: Suit[] = ['heart'];
		const deckValues: Face[] = ['A', '2', '4', '6', '8', '9', 'J', 'K'];

		this.name = 'Myconid';
		this.technicalName = 'myconid';
		this.maxHealth = 7;
		this.currentHealth = 7;
		this.minAttack = 6;
		this.level = 3;
		this.type = EnnemyType.standard;
		this.deck.generateDeck(deckSuits, deckValues);
		this.passiveAbilities = [new Intimidation()];
		this.discard = new Discard();
		this.inventory = [];
		this.status = [];
	}
}
