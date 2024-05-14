import { writable } from 'svelte/store';
import { Card } from '../card';
import { stackedFMSStore } from '../stackedFMS';

type Discard = {
    cards: Array<Card>,
    state: string
}

export const createDiscardStore = () => {
    const { update, subscribe } = writable<Discard>({
      cards: [],
      state: 'idle',
    });
  
    function addToDiscard(card: Card) {
      update((store) => ({
        ...store,
        cards: [...store.cards, card],
        state: 'idle'
      }));
    }

    function removeFromDiscard(card: Card) {
      update((store) => ({
        ...store,
        cards: store.cards.filter((c) => c !== card),
        state: 'idle'
      }));
    } 
  
    return {
      subscribe,
      addToDiscard,
      removeFromDiscard
    };
  }

export const playerDiscardStore = createDiscardStore();
export const enemyDiscardStore = createDiscardStore();

stackedFMSStore.subscribe((states) => {
  const currentState = states[states.length - 1];

  if(currentState === undefined){
    return;
  }

  if(currentState.name === 'discard.player.add-card'){
      if(currentState.data !== null){
        playerDiscardStore.addToDiscard(currentState.data.card)
      }
      stackedFMSStore.removeTopState()
  }

  if(currentState.name === 'discard.enemy.add-card'){
    if(currentState.data !== null){
      enemyDiscardStore.addToDiscard(currentState.data.card)
    }
    stackedFMSStore.removeTopState()
  }
});