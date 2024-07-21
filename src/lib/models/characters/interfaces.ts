import type { Deck } from "../deck/model";
import type { Discard } from "../discard/model";
import type { ItemTypes } from "../items/types";
import type { PassiveAbility } from "./passiveAbility/interfaces";
import type { Status } from "./status/interfaces";
import type { EnnemyType } from "./types";

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

export interface Player extends Character {

    
}

export interface Enemy extends Character {
    minAttack: number;   
    type: EnnemyType;
}