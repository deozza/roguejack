import { writable } from "svelte/store";
import { Card, value, type Face, type Suit } from "../card";


export type Deck = {
    cards: Card[];
};

export const createDeckStore = () => {
    const { subscribe, set, update } = writable<Deck>({
        cards: [],
    });

    function generateDeck(suits: Array<Suit>, faces: Array<Face>) {
        update((state) => {
            let cardId: number = 1;
            suits.forEach((suit: Suit) => {
                faces.forEach((face: Face) => {
                    const card: Card = new Card();
                    card.suit = suit;
                    card.face = face;
                    card.value = value[face];
                    card.id = cardId;

                    state.cards = [...state.cards, card];
                    cardId++;
                });
            });

            return state;
        });
    }

    function shuffleDeck() {
        update((state) => {
            state.cards = state.cards.sort(() => Math.random() - 0.5);
            return state;
        });
    }

    function drawTopCard() {
        update((state) => {
            const card = state.cards[0];
            if (!card) {
                return state;
            }

            state.cards = state.cards.slice(1);
            return state;
        });
    }

    function putCardOnTop(card: Card) {
        update((state) => {
            state.cards = [card, ...state.cards];
            return state;
        });
    }

    return {
        subscribe,
        set,
        update,
        generateDeck,
        shuffleDeck,
        drawTopCard,
        putCardOnTop
    };
}