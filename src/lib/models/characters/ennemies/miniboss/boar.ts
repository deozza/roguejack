import type { Face, Suit } from "$lib/models/card/types";
import DefaultEnemyCharacter from "..";
import type { Enemy } from "../../interfaces";
import { EnnemyType } from "../../types";

export default class Boar extends DefaultEnemyCharacter implements Enemy {
    constructor() {
        super();

        const deckSuits: Suit[] = ['spade'];
        const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

        this.name = 'Boar';
        this.technicalName = 'boar';
        this.maxHealth = 10;
        this.currentHealth = 10;
        this.minAttack = 12;
        this.type = EnnemyType.miniboss;
        this.deck.generateDeck(deckSuits, deckValues);
    }    
}