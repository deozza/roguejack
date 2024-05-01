import { writable, get } from 'svelte/store';
import { Card } from '../card';
import { messageBusStore } from '../messageBus';

type Deck = {
    cards: Array<Card>,
    state: string
}

export const createDeckStore = () => {
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
        drawTopCard,
        get
    };
  }

export const playerDeckStore = createDeckStore();
export const enemyDeckStore = createDeckStore();

messageBusStore.subscribe((events) => {
  events.forEach((event) => {
      if(event.state !== 'sent'){
          return;
      }

      if(event.event === 'generate-player-deck'){
          playerDeckStore.generateDeck();
          event.state = 'resolved';
          messageBusStore.addEvent('player-deck-generated');
      }

      if(event.event === 'player-deck-generated'){
          playerDeckStore.shuffleDeck();
          event.state = 'resolved';
          messageBusStore.addEvent('player-deck-shuffled');
      }

      if(event.event === 'generate-enemy-deck'){
          enemyDeckStore.generateDeck();
          event.state = 'resolved';
          messageBusStore.addEvent('enemy-deck-generated');
      }

      if(event.event === 'enemy-deck-generated'){
          enemyDeckStore.shuffleDeck();
          event.state = 'resolved';
          messageBusStore.addEvent('enemy-deck-shuffled');
      }

      if(event.event === 'player-draw'){
          const card: Card | null = playerDeckStore.drawTopCard(playerDeckStore.get(playerDeckStore));
          if(card !== null){
            messageBusStore.addEvent('player-card-drawn', card);
          }else{
            messageBusStore.addEvent('player-deck-empty', null);
          }
          event.state = 'resolved';
      }

      if(event.event === 'enemy-draw'){
        const card: Card | null = enemyDeckStore.drawTopCard(enemyDeckStore.get(enemyDeckStore));
        if(card !== null){
          messageBusStore.addEvent('enemy-card-drawn', card);
        }else{
          messageBusStore.addEvent('enemy-deck-empty', null);
        }
        event.state = 'resolved';
    }
  });
})