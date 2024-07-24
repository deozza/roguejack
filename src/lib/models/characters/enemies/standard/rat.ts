import type { Face, Suit } from "$lib/models/card/types";
import { type Enemy } from "$lib/models/characters/enemies";
import { EnnemyType } from "$lib/models/characters/types";
import { DefaultCharacter } from "$lib/models/characters";
import { Discard } from "$lib/models/discard/model";

export default class Rat extends DefaultCharacter implements Enemy {

    minAttack: number;
    type: EnnemyType;
    
    constructor() {
        super();

        this.make();
    }

    make() {
        
        const deckSuits: Suit[] = ['spade'];
        const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

        this.name = 'Rat';
        this.technicalName = 'rat';
        this.maxHealth = 2;
        this.currentHealth = 2;
        this.minAttack = 11;
        this.level = 1;
        this.type = EnnemyType.standard;
        this.deck.generateDeck(deckSuits, deckValues);
        this.discard = new Discard();
    }
}