import type { Face, Suit } from '$lib/models/card/types';
import { Player, type PlayerInterface } from '$lib/models/characters/players';
import Bravery from '$lib/models/effects/passiveAbility/bravery';
import { Discard } from '$lib/models/discard/model';
import Blinded from '$lib/models/effects/status/blinded';
import Poisoned from '$lib/models/effects/status/poisoned';

export default class Knight extends Player implements PlayerInterface {
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
		this.discard = new Discard();
		this.icon = 'game-icons:black-knight-helm';
		this.passiveAbilities = [new Bravery()];
		this.inventory = [];
		this.status = [new Poisoned()];
		this.armors = [];
	}
}
