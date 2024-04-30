import type { CardStore } from '../card';

export class HandStore {
    public cards: Array<CardStore> = [];
        
    public getHandSize() {
        return this.cards.length;
    }
    
    public addToHand(card: CardStore): HandStore {
        this.cards.push(card);
        return this;
    }

    public getHandValue(): number {
        let score: number = 0;
        let figuresCount: number = 0;
        let acesCount: number = 0;
        const aceValue: number = 11;

        this.cards.forEach((card: CardStore) => {
            const { numberValue, figureValue } = card;
            if (numberValue === 1) {
                acesCount++;
            } else if (numberValue !== null && numberValue > 1) {
                score += numberValue;
            } else if (figureValue) {
                score += 10;
                figuresCount++;
            }
        })

        if(this.cards.length === (figuresCount + acesCount)) {
            return 777;
        }

        for(let i: number = 0; i < acesCount; i++) {
            if (score + aceValue > 21) {
                score += 1;
            } else {
                score += aceValue;
            }
        }

        return score;
    }
}

export const handStore = new HandStore();