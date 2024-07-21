import type { Face, Suit } from "$lib/models/card/types";
import DefaultEnemyCharacter from "..";
import type { Enemy } from "../../interfaces";

export default class Slime extends DefaultEnemyCharacter implements Enemy {
    constructor() {
        super();

        const deckSuits: Suit[] = ['spade'];
        const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

        this.name = 'Slime';
        this.technicalName = 'slime';
        this.maxHealth = 10;
        this.currentHealth = 10;
        this.minAttack = 8;
        this.level = 2;
        this.deck.generateDeck(deckSuits, deckValues);
    }    
}