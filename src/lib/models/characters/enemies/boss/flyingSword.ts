import type { Face, Suit } from '$lib/models/card/types';
import { Enemy, type EnemyInterface } from '$lib/models/characters/enemies';
import { EnnemyType } from '$lib/models/characters/types';
import { Discard } from '$lib/models/discard/model';
import { getRandomSuit } from '$lib/models/card/model';
import SharpSword from '$lib/models/effects/passiveAbility/sharpSword';

export default class FlyingSword extends Enemy implements EnemyInterface {
	minAttack: number;
	type: EnnemyType;

	constructor() {
		super();

		this.make();
	}

	make() {
		const deckSuits: Suit[] = ['spade', getRandomSuit()];
		const deckValues: Face[] = [
			'A',
			'5',
			'5',
			'6',
			'6',
			'6',
			'7',
			'7',
			'7',
			'7',
			'8',
			'8',
			'8',
			'8',
			'8'
		];

		this.name = 'Flying sword';
		this.technicalName = 'flyingSword';
		this.maxHealth = 10;
		this.currentHealth = 10;
		this.minAttack = 12;
		this.level = 1;
		this.type = EnnemyType.boss;
		this.deck.generateDeck(deckSuits, deckValues);
		this.passiveAbilities = [new SharpSword()];
		this.discard = new Discard();
		this.inventory = [];
		this.status = [];
		this.armors = [];
	}
}
