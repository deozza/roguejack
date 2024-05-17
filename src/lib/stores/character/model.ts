import { Deck } from '../deck/model';
import { Discard } from '../discard/model';

export class Character {
	name: string;
	level: number;
	currentHealth: number;
	maxHealth: number;
	deck: Deck;
	discard: Discard;

	public generateCharacter() {
		this.name = 'Player';
		this.level = 1;
		this.maxHealth = 10;
		this.currentHealth = 10;
		this.deck = new Deck();
		this.discard = new Discard();
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
