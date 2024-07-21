import type { Face, Suit } from "$lib/models/card/types";
import DefaultEnemyCharacter from "..";
import type { Enemy } from "../../interfaces";
import { EnnemyType } from "../../types";

export default class Owlbear extends DefaultEnemyCharacter implements Enemy {
    constructor() {
        super();

        const deckSuits: Suit[] = ['spade', 'heart'];
        const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

        this.name = 'Owlbear';
        this.technicalName = 'owlbear';
        this.maxHealth = 20;
        this.currentHealth = 20;
        this.minAttack = 14;
        this.level = 2;
        this.type = EnnemyType.boss;
        this.deck.generateDeck(deckSuits, deckValues);
    }    
}