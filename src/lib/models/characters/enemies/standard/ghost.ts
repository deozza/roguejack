import type { Face, Suit } from '$lib/models/card/types';
import { Enemy, type EnemyInterface } from '$lib/models/characters/enemies';
import { EnnemyType } from '$lib/models/characters/types';
import Intimidation from '$lib/models/effects/passiveAbility/intimidation';
import { Discard } from '$lib/models/discard/model';
import { getRandomSuit } from '$lib/models/card/model';
import Ethereal from '$lib/models/effects/passiveAbility/ethereal';

export default class Ghost extends Enemy implements EnemyInterface {
	minAttack: number;
	type: EnnemyType;

	constructor() {
		super();
		this.make();
	}

	make() {
		const deckSuits: Suit[] = [getRandomSuit()];
		const deckValues: Face[] = ['A', '2', '4', '6', '8', '9', 'J', 'K'];

		this.name = 'Ghost';
		this.technicalName = 'ghost';
		this.maxHealth = 7;
		this.currentHealth = 7;
		this.minAttack = 11;
		this.level = 3;
		this.type = EnnemyType.standard;
		this.deck.generateDeck(deckSuits, deckValues);
		this.passiveAbilities = [new Intimidation(), new Ethereal()];
		this.discard = new Discard();
		this.inventory = [];
		this.status = [];
		this.armors = [];
	}
}
