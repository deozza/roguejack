import type { CardStore } from '../card';

export class HandStore {
    public cards: Array<CardStore> = [];
    public score: number = 0;
    public isBlackJack: boolean = false;
    public isBusted: boolean = false;

    public getHandSize() {
        return this.cards.length;
    }
    
    public addToHand(card: CardStore): HandStore {
        this.cards.push(card);
        return this.setScore();
    }

    public setScore(): HandStore {
        this.score = 0;
        let figuresCount: number = 0;
        let acesCount: number = 0;
        const aceValue: number = 11;

        this.cards.forEach((card: CardStore) => {
            const { numberValue, figureValue } = card;
            if (numberValue === 1) {
                acesCount++;
            } else if (numberValue !== null && numberValue > 1) {
                this.score += numberValue;
            } else if (figureValue) {
                this.score += 10;
                figuresCount++;
            }
        })

        if(this.cards.length === 2 && figuresCount === 1 && acesCount === 1) {
            this.isBlackJack = true;
            this.score = 21;
            return this;
        }

        for(let i: number = 1; i <= acesCount; i++) {
            if (this.score + aceValue > 21) {
                this.score += 1;
            } else {
                this.score += aceValue;
            }
        }

        if(this.score > 21) {
            this.isBusted = true;
        }

        return this;
    }
}

export const handStore = new HandStore();