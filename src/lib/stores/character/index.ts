import { writable, get, derived } from 'svelte/store';
import { messageBusStore } from '../messageBus';

type Character = {
    currentLife: number,
    maxLife: number,
    name: string,
}

export const createCharacterStore = () => {
    const { update, subscribe } = writable<Character>({
      currentLife: 0,
      maxLife: 0,
      name: '',
    });
  
    function generateStandardPlayer() {
        update(() => ({
            currentLife: 20,
            maxLife: 20,
            name: 'Player',
          }));
    }

    function generateStandardEnemy() {
        update(() => ({
            currentLife: 5,
            maxLife: 5,
            name: 'Enemy',
          }));
    }
    return {
        subscribe,
        generateStandardEnemy,
        generateStandardPlayer,
        get
    };
  }

export const playerCharacterStore = createCharacterStore();
export const playerCharacterHealthBarColor = derived(playerCharacterStore, ($playerCharacterStore) => {
    if ($playerCharacterStore.currentLife > $playerCharacterStore.maxLife * 0.75) {
        return "bg-green-500";
    } else if ($playerCharacterStore.currentLife > $playerCharacterStore.maxLife * 0.5) {
        return "bg-yellow-500";
    } else if ($playerCharacterStore.currentLife > $playerCharacterStore.maxLife * 0.25) {
        return "bg-orange-500";
    } else {
        return "bg-red-500";
    }
});

export const enemyCharacterStore = createCharacterStore();
export const enemyCharacterHealthBarColor = derived(enemyCharacterStore, ($enemyCharacterStore) => {
    if ($enemyCharacterStore.currentLife > $enemyCharacterStore.maxLife * 0.75) {
        return "bg-green-500";
    } else if ($enemyCharacterStore.currentLife > $enemyCharacterStore.maxLife * 0.5) {
        return "bg-yellow-500";
    } else if ($enemyCharacterStore.currentLife > $enemyCharacterStore.maxLife * 0.25) {
        return "bg-orange-500";
    } else {
        return "bg-red-500";
    }
});

messageBusStore.subscribe((events) => {
    events.forEach((event) => {
        if(event.state !== 'sent'){
            return;
        }

        if(event.event === 'generate-player-character'){
            playerCharacterStore.generateStandardPlayer();
            messageBusStore.updateEventState(event.id, 'resolved');
        }

        if(event.event === 'generate-standard-enemy-character'){
            enemyCharacterStore.generateStandardEnemy();
            messageBusStore.updateEventState(event.id, 'resolved');
        }
    });
})