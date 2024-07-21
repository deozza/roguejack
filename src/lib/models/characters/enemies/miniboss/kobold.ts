import type { Face, Suit } from "$lib/models/card/types";
import { type Enemy } from "$lib/models/characters/enemies";
import { EnnemyType } from "$lib/models/characters/types";
import { DefaultCharacter } from "$lib/models/characters";
import SharpSword from "../../passiveAbility/sharpSword";


export default class Kobold extends DefaultCharacter implements Enemy {

    minAttack: number;
    type: EnnemyType;
    
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
        this.passiveAbilities.push(new SharpSword());

    }    
}