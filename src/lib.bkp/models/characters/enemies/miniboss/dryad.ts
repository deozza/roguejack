import type { Face, Suit } from '$lib/models/card/types';
import { Enemy, type EnemyInterface } from '$lib/models/characters/enemies';
import { EnnemyType } from '$lib/models/characters/types';
import { Discard } from '$lib/models/discard/model';
import Charm from '$lib/models/effects/passiveAbility/charm';

export default class Dryad extends Enemy implements EnemyInterface {
	minAttack: number;
	type: EnnemyType;

	constructor() {
		super();

		this.make();
	}

	make() {
		const deckSuits: Suit[] = ['heart'];
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
			'J',
			'Q',
			'K',
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
			'J',
			'Q',
			'K'
		];

		this.name = 'Dryad';
		this.technicalName = 'dryad';
		this.maxHealth = 7;
		this.currentHealth = 7;
		this.minAttack = 13;
		this.level = 2;
		this.type = EnnemyType.miniboss;
		this.deck.generateDeck(deckSuits, deckValues);
		this.passiveAbilities = [new Charm()];
		this.discard = new Discard();
		this.inventory = [];
		this.status = [];
		this.armors = [];
	}
}
