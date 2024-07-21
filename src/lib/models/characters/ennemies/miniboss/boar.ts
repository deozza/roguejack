import type { Face, Suit } from "$lib/models/card/types";
import DefaultEnemyCharacter from "$lib/models/characters/ennemies";
import { EnnemyType } from "$lib/models/characters/types";


export default class Boar extends DefaultEnemyCharacter {
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