import type { Face, Suit } from '$lib/models/card/types';
import { Enemy } from '$lib/models/characters/enemies';
import { EnnemyType } from '$lib/models/characters/types';
import { Discard } from '$lib/models/discard/model';
import { getRandomSuit } from '$lib/models/card/model';
import Petrification from '$lib/models/effects/passiveAbility/petrification';
import FireballScroll from '$lib/models/items/scrolls/fireballScroll';

export default class FireElemental extends Enemy {
	minAttack: number;
	type: EnnemyType;

	constructor() {
		super();

		this.make();
	}

	make() {
		const deckSuits: Suit[] = [getRandomSuit(), getRandomSuit(), getRandomSuit()];
		const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

		this.name = 'Fire elemental';
		this.technicalName = 'fireElemental';
		this.maxHealth = 35;
		this.currentHealth = 35;
		this.minAttack = 14;
		this.level = 4;
		this.type = EnnemyType.boss;
		this.deck.generateDeck(deckSuits, deckValues);
		this.discard = new Discard();
		this.inventory = [new FireballScroll()];
		this.status = [];
		this.armors = [];
		this.passiveAbilities = [];
	}
}
