import type { Face, Suit } from "$lib/models/card/types";
import DefaultEnemyCharacter from "..";

export default class Rat extends DefaultEnemyCharacter {
    constructor() {
        super();

        const deckSuits: Suit[] = ['spade'];
        const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

        this.name = 'Rat';
        this.technicalName = 'rat';
        this.maxHealth = 2;
        this.currentHealth = 2;
        this.minAttack = 10;
        this.deck.generateDeck(deckSuits, deckValues);
    }    
}