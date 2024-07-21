import type { Character } from "./interfaces";
import { Deck } from "../deck/model";
import { Discard } from "../discard/model";
import type { ItemTypes } from "../items/types";
import type { Status } from "./status/interfaces";
import type { PassiveAbility } from "./passiveAbility/interfaces";

export default class DefaultCharacter implements Character {
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