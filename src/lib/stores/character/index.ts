import { writable } from 'svelte/store';
import type { CardStore } from '../card';
import { DeckStore } from '../deck';
import { DiscardStore } from '../discard';
import { HandStore } from '../hand';

export class CharacterStore {
    public deck: DeckStore = new DeckStore();
    public discard: DiscardStore = new DiscardStore();
    public hand: HandStore = new HandStore();
    public currentLife: number = 20;
    public maxLife: number = 20;
    public name: string = '';

    public putHandIntoDiscard(): CharacterStore {
        this.hand.cards.forEach((card: CardStore) => {
            this.discard.addToDiscard(card);
        });
        this.hand = new HandStore()
        return this;
    }
}

export class EnemyStore extends CharacterStore {
    public minimumScore: number = 17;
    
    constructor() {
        super();
    }

    public drawUntilMinimumScore(): EnemyStore {
        while(this.hand.score < this.minimumScore) {
            const drawnCard: CardStore | undefined = this.deck.drawTopCard();
            if(drawnCard === undefined) {
                throw new Error('No more cards in the deck');
            }

            this.hand.addToHand(drawnCard);
        }
        return this;
    }

}

export const characterStore = writable<CharacterStore|null>(null);
export const enemyStore = writable<EnemyStore|null>(null);