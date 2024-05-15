import { CardStore } from '../card';

export class DeckStore {
    public cards: Array<CardStore> = [];
    public state: string = 'idle';
    
    public createDeck(): DeckStore {
        this.state = 'creating';
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

        this.state = 'idle';

        return this;
    }
    
    public shuffleDeck(): DeckStore {
        this.state = 'shuffling';
        this.cards = this.cards.sort(() => Math.random() - 0.5);
        this.state = 'idle';
        return this;
    }
    
    public getDeckSize(): number {
        return this.cards.length;
    }
    
    public drawTopCard(): CardStore|null {
        this.state = 'drawing-top-card';
        const card : CardStore | undefined = this.cards.shift();
        if(card === undefined){
            this.state = 'empty';
            return null;
        }
        this.state = 'idle';

        return card;
    }

    public addToDeck(card: CardStore): DeckStore {
        this.cards.push(card);
        return this;
    }
}