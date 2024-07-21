import type { Face, Suit } from "$lib/models/card/types";
import DefaultEnemyCharacter from "$lib/models/characters/ennemies";
import { EnnemyType } from "$lib/models/characters/types";


export default class Wolf extends DefaultEnemyCharacter {
    constructor() {
        super();

        const deckSuits: Suit[] = ['spade', 'heart'];
        const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

        this.name = 'Wolf';
        this.technicalName = 'wolf';
        this.maxHealth = 15;
        this.currentHealth = 15;
        this.minAttack = 11;
        this.type = EnnemyType.boss;
        this.deck.generateDeck(deckSuits, deckValues);
    }    
}