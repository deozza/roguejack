import { Deck } from "$lib/models/deck/model";
import { Discard } from "$lib/models/discard/model";
import type { ItemTypes } from "$lib/models/items/types";
import type { Status } from "$lib/models/characters/status/interfaces";
import type { PassiveAbility } from "$lib/models/characters/passiveAbility/interfaces";

export interface Character {
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
    passiveAbilities: Array<PassiveAbility>;

    takeDamage(damage: number): void;
    heal(heal: number): void;
    getHealthColor(): string;
}

export class DefaultCharacter implements Character {
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
    passiveAbilities: Array<PassiveAbility> = [];

    constructor() {
        
    }
    
    public takeDamage(damage: number): void {
        
    }
    public heal(heal: number): void {
        
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