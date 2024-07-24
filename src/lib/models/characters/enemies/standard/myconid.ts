import type { Face, Suit } from '$lib/models/card/types';
import { type Enemy } from '$lib/models/characters/enemies';
import { EnnemyType } from '$lib/models/characters/types';
import { DefaultCharacter } from '$lib/models/characters';
import Spore from '$lib/models/effects/passiveAbility/spore';
import { Discard } from '$lib/models/discard/model';

export default class Myconid extends DefaultCharacter implements Enemy {
	minAttack: number;
	type: EnnemyType;

	constructor() {
		super();
		this.make();
	}

	make() {
		const deckSuits: Suit[] = ['club'];
		const deckValues: Face[] = [
			'A',
			'2',
			'3',
			'4',
			'5',
			'6',
			'7',
			'8',
			'9',
			'10',
			'A',
			'2',
			'3',
			'4',
			'5',
			'6',
			'7',
			'8',
			'9',
			'10'
		];

		this.name = 'Myconid';
		this.technicalName = 'myconid';
		this.maxHealth = 20;
		this.currentHealth = 20;
		this.minAttack = 10;
		this.level = 3;
		this.type = EnnemyType.standard;
		this.deck.generateDeck(deckSuits, deckValues);
		this.passiveAbilities = [new Spore()];
		this.discard = new Discard();
	}
}
