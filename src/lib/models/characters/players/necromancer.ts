import type { Face, Suit } from '$lib/models/card/types';
import { Player } from '$lib/models/characters/players';
import MasteryOverDeath from '$lib/models/effects/passiveAbility/masteryOverDeath';
import { Discard } from '$lib/models/discard/model';

export default class Necromancer extends Player implements Player {
	constructor() {
		super();
		this.make();
	}

	make() {
		const deckSuits: Suit[] = ['heart', 'diamond', 'club', 'spade'];
		const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

		this.name = 'Necromancer';
		this.technicalName = 'necromancer';
		this.maxHealth = 15;
		this.currentHealth = 15;
		this.deck.generateDeck(deckSuits, deckValues);
		this.discard = new Discard();
		this.icon = 'game-icons:death-note';
		this.passiveAbilities = [new MasteryOverDeath()];
		this.inventory = [];
		this.status = [];
		this.armors = [];
	}
}
