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

        if(this.cards.length === 2 && (figuresCount + acesCount) === 2) {
            this.isBlackJack = true;
            this.score = 21;
            return this;
        }

        for(let i: number = 0; i < acesCount; i++) {
            if (score + aceValue > 21) {
                score += 1;
            } else {
                score += aceValue;
            }
        }

        this.score = score;

        if(this.score > 21) {
            this.isBusted = true;
        }

        return this;
    }
}

export const handStore = new HandStore();