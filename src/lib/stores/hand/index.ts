import { writable } from 'svelte/store';
import { Card } from '../card';
import { messageBusStore } from '../messageBus';

type Hand = {
    cards: Array<Card>,
    state: string
}

export const createHandStore = () => {
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

  messageBusStore.subscribe((events) => {
    events.forEach((event) => {
        if(event.state !== 'sent'){
            return;
        }

        if(event.event === 'player-card-drawn'){
            playerHandStore.addToHand(event.content);
            event.state = 'resolved';
            messageBusStore.addEvent('player-card-added-to-hand', null);
        }

        if(event.event === 'enemy-card-drawn'){
          enemyHandStore.addToHand(event.content);
          event.state = 'resolved';
          messageBusStore.addEvent('enemy-card-added-to-hand', null);
      }
    });
})