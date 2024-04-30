import { CardStore } from '../card';

export class DeckStore {
    public cards: Array<CardStore> = [];
    
    public createDeck(): DeckStore {
        const suits: Array<string> = ['heart', 'diamond', 'club', 'spade'];
        const values: Array<string|number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

        suits.forEach((suit: string) => {
            values.forEach((value: string|number) => {
                const card: CardStore = new CardStore();
                card.suit = suit;
                if(typeof value === 'number') {
                    card.numberValue = value;
                }else{
                    card.figureValue = value;
                }
                this.cards.push(card);
            });
        });

        return this;
    }
    
    public shuffleDeck(): DeckStore {
        this.cards = this.cards.sort(() => Math.random() - 0.5);
        return this;
    }
    
    public getDeckSize(): number {
        return this.cards.length;
    }
    
    public drawTopCard(): CardStore|undefined {
        return this.cards.shift();
    }

    public addToDeck(card: CardStore): DeckStore {
        this.cards.push(card);
        return this;
    }
}

export const deckStore = new DeckStore();