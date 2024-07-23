import type { Face, Suit } from "$lib/models/card/types";
import { type Enemy } from "$lib/models/characters/enemies";
import { EnnemyType } from "$lib/models/characters/types";
import { DefaultCharacter } from "$lib/models/characters";

export default class Slime extends DefaultCharacter implements Enemy {

    minAttack: number;
    type: EnnemyType;
    
    constructor() {
        super();
        this.make();
    }    

    make() {
        const deckSuits: Suit[] = ['spade'];
        const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

        this.name = 'Slime';
        this.technicalName = 'slime';
        this.maxHealth = 10;
        this.currentHealth = 10;
        this.minAttack = 8;
        this.level = 2;
        this.type = EnnemyType.standard;
        this.deck.generateDeck(deckSuits, deckValues);
    }
}