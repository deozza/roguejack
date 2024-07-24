import type { Face, Suit } from '$lib/models/card/types';
import { type Enemy } from '$lib/models/characters/enemies';
import { EnnemyType } from '$lib/models/characters/types';
import { DefaultCharacter } from '$lib/models/characters';
import Undead from '$lib/models/effects/passiveAbility/undead';
import { Discard } from '$lib/models/discard/model';

export default class Zombie extends DefaultCharacter implements Enemy {
	minAttack: number;
	type: EnnemyType;

	constructor() {
		super();

		this.make();
	}

	make() {
		const deckSuits: Suit[] = ['spade', 'club'];
		const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

		this.name = 'Zombie';
		this.technicalName = 'zombie';
		this.maxHealth = 7;
		this.currentHealth = 7;
		this.minAttack = 14;
		this.level = 2;
		this.type = EnnemyType.miniboss;
		this.deck.generateDeck(deckSuits, deckValues);
		this.passiveAbilities = [new Undead()];
		this.discard = new Discard();
	}
}
