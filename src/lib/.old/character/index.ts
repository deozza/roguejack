import { writable } from 'svelte/store';
import { DeckStore } from '../deck';
import { DiscardStore } from '../discard';

export class CharacterStore {
    public deck: DeckStore = new DeckStore();
    public discard: DiscardStore = new DiscardStore();
    public currentLife: number = 20;
    public maxLife: number = 20;
    public name: string = '';

    public generateStandardPlayer(): CharacterStore {
        this.name = 'Player';
        this.maxLife = 20;
        this.currentLife = 20;
        this.deck.createDeck();
        this.deck.shuffleDeck();
        return this;
    }

    public getHealthBarColor(): string {
        if (this.currentLife > this.maxLife * 0.75) {
            return "bg-green-500";
        } else if (this.currentLife > this.maxLife * 0.5) {
            return "bg-yellow-500";
        } else if (this.currentLife > this.maxLife * 0.25) {
            return "bg-orange-500";
        } else {
            return "bg-red-500";
        }
    }

    // public putHandIntoDiscard(): CharacterStore {
    //     this.hand.cards.forEach((card: CardStore) => {
    //         this.discard.addToDiscard(card);
    //     });
    //     this.hand = new HandStore()
    //     return this;
    // }
}

export class EnemyStore extends CharacterStore {
    public minimumScore: number = 17;
    
    constructor() {
        super();
    }

    public generateStandardEnemy(): EnemyStore {
        this.name = 'Enemy';
		this.maxLife = 5;
		this.currentLife = 5;
		this.deck.createDeck();
		this.deck.shuffleDeck();
        return this;
    }

    // public drawUntilMinimumScore(): EnemyStore {
    //     while(this.hand.score < this.minimumScore) {
    //         const drawnCard: CardStore | undefined = this.deck.drawTopCard();
    //         if(drawnCard === undefined) {
    //             throw new Error('No more cards in the deck');
    //         }

    //         this.hand.addToHand(drawnCard);
    //     }
    //     return this;
    // }

}