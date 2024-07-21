import type { Face, Suit } from "$lib/models/card/types";
import DefaultPlayerCharacter from "$lib/models/characters/players";

export default class Villager extends DefaultPlayerCharacter {
    constructor() {
        super();

        const deckSuits: Suit[] = ['heart', 'diamond', 'club', 'spade'];
        const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

        this.name = 'Villager';
        this.technicalName = 'villager';
        this.maxHealth = 20;
        this.currentHealth = 20;
        this.deck.generateDeck(deckSuits, deckValues);
        this.icon = "game-icons:farmer";
    }    
}