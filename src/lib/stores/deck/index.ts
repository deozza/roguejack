import { writable } from 'svelte/store';
import { Card } from '../card';

type Deck = {
    cards: Array<Card>,
    state: string
}

function createDeckStore() {
    const { update, subscribe } = writable<Deck>({
      cards: [],
      state: 'idle',
    });
  
    function generateDeck() {
        update((store) => ({
            ...store,
            state: 'creating',
          }));

        const suits: Array<string> = ['heart', 'diamond', 'club', 'spade'];
        const values: Array<string|number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
        const cards: Array<Card> = [];

        suits.forEach((suit: string) => {
            values.forEach((value: string|number) => {
                const card: Card = new Card();
                card.suit = suit;
                if(typeof value === 'number') {
                    card.numberValue = value;
                }else{
                    card.figureValue = value;
                }
                cards.push(card);
            });
        });

  
      update(() => ({
        cards: cards,
        state: 'idle'
      }));
    }

    function drawTopCard(deck: Deck): Card|null {
        update((store) => ({
            ...store,
            state: 'drawing',
          }));
  
        const card : Card | undefined = deck.cards[0];

        if(card === undefined){
            update(() => ({
                cards: [],
                state: 'empty'
              }));
            return null;
        }

        update((store) => ({
          cards: store.cards.slice(1),
          state: 'idle'
        }));
  
        return card;
      }

    function shuffleDeck(){

        update((store) => ({
            ...store,
            cards: store.cards.sort(() => Math.random() -0.5),
          }));
    }
  
    return {
        subscribe,
        generateDeck,
        shuffleDeck,
        drawTopCard
    };
  }
  
export const playerDeckStore = createDeckStore();