import type { CardStore } from '../card';

export class HandStore {
    public cards: Array<CardStore> = [];
    public state: string = 'idle';

    public getHandSize() {
        return this.cards.length;
    }
    
    public addToHand(card: CardStore): HandStore {
        this.state = 'adding-card-to-hand';
        this.cards.push(card);
        this.state = 'idle';
        
        return this;
    }


}