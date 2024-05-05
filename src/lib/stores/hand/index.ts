import { writable } from 'svelte/store';
import { Card } from '../card';
import { stackedFMSStore } from '../stackedFMS';

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

stackedFMSStore.subscribe((states) => {
  const currentState = states[states.length - 1];

  if(currentState === undefined){
    return;
  }

  if(currentState.name === 'hand.player.add-card'){
      if(currentState.data !== null){
        playerHandStore.addToHand(currentState.data.card)
        stackedFMSStore.transitionToState({
            id: '',
            name: 'turn.player.calculate-score',
            from: [],
            to: [],
            data: null
        });
      }
  }

  if(currentState.name === 'hand.enemy.add-card'){
    if(currentState.data !== null){
      enemyHandStore.addToHand(currentState.data.card)
      stackedFMSStore.transitionToState({
          id: '',
          name: 'turn.enemy.calculate-score',
          from: [],
          to: [],
          data: null
      });
    }
  }
});