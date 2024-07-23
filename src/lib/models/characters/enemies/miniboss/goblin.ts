import type { Face, Suit } from "$lib/models/card/types";
import { type Enemy } from "$lib/models/characters/enemies";
import { EnnemyType } from "$lib/models/characters/types";
import { DefaultCharacter } from "$lib/models/characters";
import SharpSword from "$lib/models/effects/passiveAbility/sharpSword";
import Dodge from "$lib/models/effects/passiveAbility/dodge";

export default class Goblin extends DefaultCharacter implements Enemy {

    minAttack: number;
    type: EnnemyType;
    
    constructor() {
        super();

        this.make();
    }    

    make() {
        const deckSuits: Suit[] = ['club'];
        const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

        this.name = 'Goblin';
        this.technicalName = 'goblin';
        this.maxHealth = 10;
        this.currentHealth = 10;
        this.minAttack = 14;
        this.level = 3;
        this.type = EnnemyType.miniboss;
        this.deck.generateDeck(deckSuits, deckValues);
        this.passiveAbilities = [new Dodge()];
    }
}