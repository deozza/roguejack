import type { Face, Suit } from '$lib/models/card/types';
import { Player } from '$lib/models/characters/players';
import { Discard } from '$lib/models/discard/model';

export default class Villager extends Player implements Player {
	constructor() {
		super();
		this.make();
	}

	make() {
		const deckSuits: Suit[] = ['heart', 'diamond', 'club', 'spade'];
		const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

		this.name = 'Villager';
		this.technicalName = 'villager';
		this.maxHealth = 20;
		this.currentHealth = 20;
		this.deck.generateDeck(deckSuits, deckValues);
		this.discard = new Discard();
		this.icon = 'game-icons:farmer';
		this.inventory = [];
		this.status = [];
		this.armors = [];
	}
}
