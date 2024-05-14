import { writable, get } from 'svelte/store';
import { Card } from '../card';
import { stackedFMSStore } from '../stackedFMS';

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
        let cards: Array<Card> = [];

        suits.forEach((suit: string) => {
            values.forEach((value: string|number) => {
                const card: Card = new Card();
                card.suit = suit;
                if(typeof value === 'number') {
                    card.numberValue = value;
                }else{
                    card.figureValue = value;
                }
                cards = [...cards, card];
            });
        });

  
      update(() => ({
        cards: cards,
        state: 'idle'
      }));
    }

    function drawTopCard(deck: Deck): Card|undefined {
      if(deck.cards.length === 0){
          return undefined;
      }

      const card: Card = deck.cards[0];

      update((store) => ({
        ...store,
        cards: deck.cards.slice(1),
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

stackedFMSStore.subscribe((states) => {
  const currentState = states[states.length - 1];

  if(currentState === undefined){
    return;
  }

  if(currentState.name === 'deck.player.create'){
    playerDeckStore.generateDeck();
    stackedFMSStore.transitionToState({
        id: '',
        name: 'deck.player.shuffle',
        from: [],
        to: [],
        data: null
    });
  }

  if(currentState.name === 'deck.player.shuffle'){
    playerDeckStore.shuffleDeck();
    stackedFMSStore.removeTopState();
  }

  if(currentState.name === 'deck.enemy.create'){
    enemyDeckStore.generateDeck();
    stackedFMSStore.transitionToState({
        id: '',
        name: 'deck.enemy.shuffle',
        from: [],
        to: [],
        data: null
    });
  }

  if(currentState.name === 'deck.enemy.shuffle'){
    enemyDeckStore.shuffleDeck();
    stackedFMSStore.removeTopState();
  }

  if(currentState.name === 'deck.player.draw-top-card'){
    const card : Card | undefined = playerDeckStore.drawTopCard(get(playerDeckStore));
    if(card !== undefined){
        stackedFMSStore.transitionToState({
            id: '',
            name: 'hand.player.add-card',
            from: ['deck.player.draw-top-card'],
            to: [],
            data: {card: card}
        });
    }

  }

  if(currentState.name === 'deck.enemy.draw-top-card'){
    const card : Card | null = enemyDeckStore.drawTopCard(get(enemyDeckStore));
    if(card === null){
        stackedFMSStore.transitionToState({
            id: '',
            name: 'deck.enemy.empty',
            from: ['deck.enemy.draw-top-card'],
            to: [],
            data: null
        });
        return;
    }
    stackedFMSStore.transitionToState({
        id: '',
        name: 'hand.enemy.add-card',
        from: ['deck.enemy.draw-top-card'],
        to: [],
        data: {card: card}
    });
  }
});