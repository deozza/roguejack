import { writable } from 'svelte/store';
import { messageBusStore } from '../messageBus';


export const createGameStore = () => {
    const { subscribe } = writable(null);
  
    return {
      subscribe,
    };
  }

export const gameStore = createGameStore();

messageBusStore.subscribe((events) => {
    events.forEach((event) => {
        if(event.state !== 'sent'){
            return;
        }

        if(event.event === 'init-game'){
            messageBusStore.updateEventState(event.id, 'pending');
            messageBusStore.addEvent('generate-player-character');
            messageBusStore.updateEventState(event.id, 'resolved');
        }
    });
})