import type { Face, Suit } from "$lib/models/card/types";
import DefaultPlayerCharacter from "$lib/models/characters/players";


export default class Necromancer extends DefaultPlayerCharacter {
    constructor() {
        super();

        const deckSuits: Suit[] = ['heart', 'diamond', 'club', 'spade'];
        const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

        this.name = 'Necromancer';
        this.technicalName = 'necromancer';
        this.maxHealth = 15;
        this.currentHealth = 15;
        this.deck.generateDeck(deckSuits, deckValues);
        this.icon = "game-icons:death-note";
    }    
}