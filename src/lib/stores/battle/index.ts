import { writable } from 'svelte/store';
import { messageBusStore } from '../messageBus';


export const createBattleStore = () => {
    const { subscribe } = writable(null);
  
    return {
      subscribe,
    };
  }

export const battleStore = createBattleStore();

messageBusStore.subscribe((events) => {
    events.forEach((event) => {
        if(event.state !== 'sent'){
            return;
        }

        if(event.event === 'init-battle'){
            messageBusStore.updateEventState(event.id, 'pending');
            messageBusStore.addEvent('generate-standard-enemy-character');
            messageBusStore.addEvent('generate-player-deck');
            messageBusStore.addEvent('generate-enemy-deck');
            
            messageBusStore.updateEventState(event.id, 'resolved');
            
        }
    });
})