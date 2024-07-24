import type { Face, Suit } from '$lib/models/card/types';
import type { Player } from '$lib/models/characters/players';
import { DefaultCharacter } from '$lib/models/characters/';
import Bravery from '$lib/models/effects/passiveAbility/bravery';
import Crossbow from '$lib/models/items/weapons/crossbow';

export default class Knight extends DefaultCharacter implements Player {
	constructor() {
		super();

		this.make();
	}

	make() {
		const deckSuits: Suit[] = ['heart', 'diamond', 'club', 'spade'];
		const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

		this.name = 'Knight';
		this.technicalName = 'knight';
		this.maxHealth = 20;
		this.currentHealth = 20;
		this.deck.generateDeck(deckSuits, deckValues);
		this.icon = 'game-icons:black-knight-helm';
		this.passiveAbilities = [new Bravery()];
	}
}
