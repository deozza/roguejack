import { Deck } from "$lib/models/deck/model";
import { Discard } from "$lib/models/discard/model";
import type { ItemTypes } from "$lib/models/items/types";
import type { Status } from "$lib/models/characters/status/interfaces";
import type { PassiveAbility } from "$lib/models/characters/passiveAbility/interfaces";
import type { Enemy } from "./enemies";

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

    takeDamage(damage: number): Character;
    heal(heal: number): Character;
    getHealthColor(): string;
    addToInventory(item: ItemTypes): Character;
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
    
    public takeDamage(damage: number): DefaultCharacter {
        return this;
    }
    public heal(heal: number): DefaultCharacter {
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
    
}

export function checkCharacterIsForEnnemy(character: Character): boolean {
    return (character as Enemy).type !== undefined;
}