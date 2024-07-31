import { Deck } from '$lib/models/deck/model';
import { Discard } from '$lib/models/discard/model';
import type { ItemTypes } from '$lib/models/items/types';
import type { Status } from '$lib/models/effects/interfaces';
import type { ContinuousEffect } from '$lib/models/effects/interfaces';
import type { ArmorInterface } from '../items/interfaces';
import type { Damage } from '../damage/model';

export interface CharacterInterface {
	name: string;
	technicalName: string;
	level: number;
	currentHealth: number;
	maxHealth: number;
	deck: Deck;
	discard: Discard;
	inventory: Array<ItemTypes>;
	icon: string;
	status: Array<Status>;
	passiveAbilities: Array<ContinuousEffect>;
	armors: Array<ArmorInterface>;

	takeDamage(damage: Damage): CharacterInterface;
	heal(heal: number): CharacterInterface;
	getHealthColor(): string;
	make(): void;
	addToInventory(item: ItemTypes): DefaultCharacter;
	removeItemFromInventory(item: ItemTypes): DefaultCharacter;
}

export class DefaultCharacter implements CharacterInterface {
	name: string = '';
	technicalName: string = '';
	level: number = 0;
	currentHealth: number = 0;
	maxHealth: number = 0;
	deck: Deck = new Deck();
	discard: Discard = new Discard();
	inventory: ItemTypes[] = [];
	icon: string = '';
	status: Array<Status> = [];
	passiveAbilities: Array<ContinuousEffect> = [];
	armors: Array<ArmorInterface> = [];

	constructor() {}

	public takeDamage(damage: Damage): DefaultCharacter {
		this.currentHealth = Math.max(0, this.currentHealth - damage.totalDamage);
		return this;
	}
	public heal(heal: number): DefaultCharacter {
		this.currentHealth = Math.min(this.maxHealth, this.currentHealth + heal);
		return this;
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

	public addToInventory(item: ItemTypes): DefaultCharacter {
		this.inventory = [...this.inventory, item];
		return this;
	}

	public removeItemFromInventory(item: ItemTypes): DefaultCharacter {
		this.inventory = this.inventory.filter((i) => i !== item);
		return this;
	}

	make(): void {}
}

