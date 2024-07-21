import type { Face, Suit } from "$lib/models/card/types";
import DefaultEnemyCharacter from "..";
import type { Enemy } from "../../interfaces";
import { EnnemyType } from "../../types";

export default class Kobold extends DefaultEnemyCharacter implements Enemy {
    constructor() {
        super();

        const deckSuits: Suit[] = ['spade', 'club'];
        const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

        this.name = 'Kobold';
        this.technicalName = 'kobold';
        this.maxHealth = 10;
        this.currentHealth = 10;
        this.minAttack = 14;
        this.level = 2;
        this.type = EnnemyType.miniboss;
        this.deck.generateDeck(deckSuits, deckValues);
    }    
}