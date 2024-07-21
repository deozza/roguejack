import type { Face, Suit } from "$lib/models/card/types";
import DefaultEnemyCharacter from "$lib/models/characters/ennemies";
import { EnnemyType } from "$lib/models/characters/types";

export default class Owlbear extends DefaultEnemyCharacter {
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