import { writable } from 'svelte/store';
import { Card } from '../card';

type Hand = {
    cards: Array<Card>,
    state: string
}

function createHandStore() {
    const { update, subscribe } = writable<Hand>({
      cards: [],
      state: 'idle',
    });
  
    function addToHand(card: Card) {
      update((store) => ({
        ...store,
        cards: [...store.cards, card],
        state: 'idle'
      }));
    }
  
    return {
      subscribe,
      addToHand,
    };
  }
  
export const playerHandStore = createHandStore();
export const enemyHandStore = createHandStore();
