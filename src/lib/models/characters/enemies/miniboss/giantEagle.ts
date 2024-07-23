import type { Face, Suit } from "$lib/models/card/types";
import { type Enemy } from "$lib/models/characters/enemies";
import { EnnemyType } from "$lib/models/characters/types";
import { DefaultCharacter } from "$lib/models/characters";
import Fly from "$lib/models/effects/passiveAbility/fly";


export default class GiantEagle extends DefaultCharacter implements Enemy {

    minAttack: number;
    type: EnnemyType;
    
    constructor() {
        super();
        this.make();
    }    

    make() {
        const deckSuits: Suit[] = ['spade', 'heart'];
        const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

        this.name = 'Giant eagle';
        this.technicalName = 'giantEagle';
        this.maxHealth = 12;
        this.currentHealth = 12;
        this.minAttack = 12;
        this.level = 3;
        this.type = EnnemyType.miniboss;
        this.deck.generateDeck(deckSuits, deckValues);
        this.passiveAbilities = [new Fly()]
    }
}