import type { Card } from "../card";

export class Hand {
    public cards: Card[] = [];
    public value: number = 0;
    public isBusted: boolean = false;
    public isBlackjack: boolean = false;

    public addCard(card: Card): void {
        this.cards = [...this.cards, card];
        this.calculateValue();
    }

    public removeCard(card: Card): void {
        this.cards = this.cards.filter((c: Card) => c.id !== card.id);
        this.calculateValue();
    }

    public clearHand(): void {
        this.cards = [];
        this.calculateValue();
    }

    private calculateValue(): void {
        let figuresCount: number = 0;
        let acesCount: number = 0;
        const aceValue: number = 11;

        let value = 0;
        this.isBusted = false;
        this.isBlackjack = false;

        this.cards.forEach((card: Card) => {
            if (card.face === 'A') {
                acesCount++;
            } else if (['J', 'Q', 'K'].includes(String(card.face))) {
                figuresCount++;
                value += 10;
            }else {
                value += Number(card.value);
            }
        });

        if (this.cards.length === 2 && figuresCount === 1 && acesCount === 1) {
            this.isBlackjack = true;
            this.value = 21;
            return;
        }

        for (let i: number = 1; i <= acesCount; i++) {
            if (value + aceValue > 21) {
                value += 1;
            } else {
                value += aceValue;
            }
        }

        this.value = value;
    
        if (value > 21) {
            this.isBusted = true;
        }
    }
}