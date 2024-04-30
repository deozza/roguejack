import type { CardStore } from '../card';

export class DiscardStore {
    public cards: Array<CardStore> = [];
        
    public getDiscardSize() {
        return this.cards.length;
    }
    
    public addToDiscard(card: CardStore) {
        this.cards.push(card);
    }
}

export const discardStore = new DiscardStore();