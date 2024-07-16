import { Deck } from '$lib/models/deck/model';
import { Discard } from '$lib/models/discard/model';
import { sideEffects } from '../effect';
import type EffectInterface from '../effect/effectInterface';

export class Character {
	name: string;
	level: number;
	currentHealth: number;
	maxHealth: number;
	deck: Deck;
	discard: Discard;
	minAttack: number | null = null;
	sideEffect: EffectInterface | null = null;

	public generateCharacter(characterType: object) {
		this.name = characterType.name;
		this.level = characterType.level;
		this.maxHealth = characterType.maxHealth;
		this.currentHealth = characterType.maxHealth;
		this.deck = new Deck();
		this.deck.generateDeck(characterType.deck.suits, characterType.deck.values);
		this.deck.shuffleDeck();
		this.discard = new Discard();

		if (characterType.minAttack) {
			this.minAttack = characterType.minAttack;
		}

		if (characterType.passive) {
			this.sideEffect = sideEffects[characterType.passive];
		}
	}

	public takeDamage(damage: number) {
		this.currentHealth = Math.max(this.currentHealth - damage, 0);
	}

	public heal(heal: number) {
		this.currentHealth = Math.min(this.currentHealth + heal, this.maxHealth);
	}

	public getHealthColor(): string {
		if (this.currentHealth / this.maxHealth > 0.75) {
			return 'bg-green-500';
		}

		if (this.currentHealth / this.maxHealth > 0.5) {
			return 'bg-yellow-500';
		}

		if (this.currentHealth / this.maxHealth > 0.25) {
			return 'bg-orange-500';
		}

		return 'bg-red-500';
	}
}
