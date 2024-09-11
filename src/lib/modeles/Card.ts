export default class Card {
    public value: Value;
    public suit: Suit;

    constructor(value: Value, suit: Suit) {
        this.value = value;
        this.suit = suit;
    }
}

export type Suit = 'heart' | 'diamond' | 'club' | 'spade';
export type Value = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

export enum SuitEnum {
    HEART = 'heart',
    DIAMOND = 'diamond',
    CLUB = 'club',
    SPADE = 'spade'
}

export enum ValueEnum {
    TWO = '2',
    THREE = '3',
    FOUR = '4',
    FIVE = '5',
    SIX = '6',
    SEVEN = '7',
    EIGHT = '8',
    NINE = '9',
    TEN = '10',
    JACK = 'J',
    QUEEN = 'Q',
    KING = 'K',
    ACE = 'A'
}