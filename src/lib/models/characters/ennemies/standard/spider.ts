import type { Face, Suit } from "$lib/models/card/types";
import DefaultEnemyCharacter from "..";
import type { Enemy } from "../../interfaces";

export default class Spider extends DefaultEnemyCharacter implements Enemy {
    constructor() {
        super();

        const deckSuits: Suit[] = ['spade'];
        const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

        this.name = 'Spider';
        this.technicalName = 'spider';
        this.maxHealth = 3;
        this.currentHealth = 3;
        this.minAttack = 11;
        this.deck.generateDeck(deckSuits, deckValues);
    }    
}