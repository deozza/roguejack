import type { Face, Suit } from '$lib/models/card/types';
import { Enemy, type EnemyInterface } from '$lib/models/characters/enemies';
import { EnnemyType } from '$lib/models/characters/types';
import Venom from '$lib/models/effects/passiveAbility/venom';
import { Discard } from '$lib/models/discard/model';
import { getRandomSuit } from '$lib/models/card/model';

export default class AxeBeak extends Enemy implements EnemyInterface {
	minAttack: number;
	type: EnnemyType;

	constructor() {
		super();
		this.make();
	}

	make() {
		const deckSuits: Suit[] = [getRandomSuit()];
		const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

		this.name = 'Axe beak';
		this.technicalName = 'axeBeak';
		this.maxHealth = 7;
		this.currentHealth = 7;
		this.minAttack = 12;
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
