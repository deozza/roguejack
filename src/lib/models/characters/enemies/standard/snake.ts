import type { Face, Suit } from "$lib/models/card/types";
import { type Enemy } from "$lib/models/characters/enemies";
import { EnnemyType } from "$lib/models/characters/types";
import { DefaultCharacter } from "$lib/models/characters";
import Venom from "$lib/models/effects/continuousEffects/venom";

export default class Snake extends DefaultCharacter implements Enemy {

    minAttack: number;
    type: EnnemyType;
    
    constructor() {
        super();
        this.make();
    }    

    make() {
        const deckSuits: Suit[] = ['spade'];
        const deckValues: Face[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

        this.name = 'Snake';
        this.technicalName = 'snake';
        this.maxHealth = 3;
        this.currentHealth = 3;
        this.minAttack = 12;
        this.level = 1;
        this.type = EnnemyType.standard;
        this.deck.generateDeck(deckSuits, deckValues);
        this.passiveAbilities = [new Venom()];
    }
}