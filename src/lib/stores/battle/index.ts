import { get, writable } from 'svelte/store';
import { stackedFMSStore } from '../stackedFMS';
import { enemyCharacterStore } from '../character';


export const createBattleStore = () => {
    const { subscribe, update } = writable({
        state: 'idle',
    });
  
    return {
      subscribe,
      update
    };
  }

export const battleStore = createBattleStore();

stackedFMSStore.subscribe((states) => {
    const currentState = states[states.length - 1];

    if(currentState === undefined){
      return;
    }

    if(currentState.name === 'battle.init'){
        if(get(battleStore).state === 'init'){
            battleStore.update(() => ({
                state: 'playing',
            }));


            stackedFMSStore.transitionToState({
                id: '',
                name: 'turn.start',
                from: [],
                to: [],
                data: null
            });
            return;
        }

      battleStore.update(() => ({
        state: 'init',
      }));

        stackedFMSStore.pushNewState({
            id: '',
            name: 'character.enemy.create',
            from: [],
            to: [],
            data: null
        });

    }    
});