import type { Face, Suit } from "$lib/models/card/types";
import type { Player } from "$lib/models/characters/players";
import { DefaultCharacter } from "$lib/models/characters";
import MasteryOverDeath from "$lib/models/characters/passiveAbility/masteryOverDeath";


export default class Necromancer extends DefaultCharacter implements Player {
    constructor() {
        super();
        this.make();
    }    

    make() {
        const deckSuits: Suit[] = ['heart', 'diamond', 'club', 'spade'];
        const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

        this.name = 'Necromancer';
        this.technicalName = 'necromancer';
        this.maxHealth = 15;
        this.currentHealth = 15;
        this.deck.generateDeck(deckSuits, deckValues);
        this.icon = "game-icons:death-note";
        this.passiveAbilities = [new MasteryOverDeath()];
    }
}