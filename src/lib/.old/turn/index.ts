import type { CardStore } from '../card';
import type { DeckStore } from '../deck';
import { HandStore } from '../hand';

class CharacterTurnStore {
    public hand: HandStore = new HandStore();
    public score: number = 0;
    public state: string = 'idle';
    public isBlackJack: boolean = false;
    public isBusted: boolean = false;

    public addToHandCardTopCardFromDeck(deck: DeckStore): CharacterTurnStore {
        this.state = 'drawing';
        const drawnCard: CardStore|null = deck.drawTopCard();
        if(drawnCard !== null) {
            this.hand.addToHand(drawnCard);
            this.setScore();
        }

        this.state = 'idle';

        return this;
    }

    public setScore(): CharacterTurnStore {
        this.state = 'scoring';
        this.score = 0;
        let figuresCount: number = 0;
        let acesCount: number = 0;
        const aceValue: number = 11;

        this.hand.cards.forEach((card: CardStore) => {
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

        if(this.hand.cards.length === 2 && figuresCount === 1 && acesCount === 1) {
            this.isBlackJack = true;
            this.score = 21;
            this.state = 'blackjack';
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
            this.state = 'busted';
        }

        this.state = 'scored';
        return this;
    }

}

export class TurnStore {
    public playerTurn: CharacterTurnStore = new CharacterTurnStore();
    public enemyTurn: CharacterTurnStore = new CharacterTurnStore();
}