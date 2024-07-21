import type { Face, Suit } from "$lib/models/card/types";
import DefaultEnemyCharacter from "$lib/models/characters/ennemies";
import { EnnemyType } from "$lib/models/characters/types";

export default class VampireBat extends DefaultEnemyCharacter {
    constructor() {
        super();

        const deckSuits: Suit[] = ['heart'];
        const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

        this.name = 'Vampire Bat';
        this.technicalName = 'vampireBat';
        this.maxHealth = 7;
        this.currentHealth = 7;
        this.minAttack = 12;
        this.type = EnnemyType.miniboss;
        this.deck.generateDeck(deckSuits, deckValues);
    }    
}