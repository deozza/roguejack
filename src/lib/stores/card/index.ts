export class Card {
	public id: number | null = null;
	public suit: Suit | null = null;
	public value: number | null = null;
	public face: Face | null = null;
}

export type Face = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';

export const value: Record<Face, number> = {
	A: 11,
	'2': 2,
	'3': 3,
	'4': 4,
	'5': 5,
	'6': 6,
	'7': 7,
	'8': 8,
	'9': 9,
	'10': 10,
	J: 10,
	Q: 10,
	K: 10
};
