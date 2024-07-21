import type { Face, Suit } from "$lib/models/card/types";
import DefaultEnemyCharacter from "..";

export default class Snake extends DefaultEnemyCharacter {
    constructor() {
        super();

        const deckSuits: Suit[] = ['spade'];
        const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

        this.name = 'Snake';
        this.technicalName = 'snake';
        this.maxHealth = 3;
        this.currentHealth = 3;
        this.minAttack = 12;
        this.level = 2;
        this.deck.generateDeck(deckSuits, deckValues);
    }    
}