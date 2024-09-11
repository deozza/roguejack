import type { Face, Suit } from '$lib/models/card/types';
import { Enemy, type EnemyInterface } from '$lib/models/characters/enemies';
import { EnnemyType } from '$lib/models/characters/types';
import { Discard } from '$lib/models/discard/model';
import { getRandomSuit } from '$lib/models/card/model';

export default class CrawlingClaw extends Enemy implements EnemyInterface {
	minAttack: number;
	type: EnnemyType;

	constructor() {
		super();

		this.make();
	}

	make() {
		const deckSuits: Suit[] = [getRandomSuit()];
		const deckValues: Face[] = ['A', '2', '3', '4', 'A', '2', '3', '4', 'A', '2', '3', '4'];

		this.name = 'Crawling claw';
		this.technicalName = 'crawlingClaw';
		this.maxHealth = 3;
		this.currentHealth = 3;
		this.minAttack = 12;
		this.level = 1;
		this.type = EnnemyType.standard;
		this.deck.generateDeck(deckSuits, deckValues);
		this.discard = new Discard();
		this.inventory = [];
		this.status = [];
		this.armors = [];
	}
}