import { get, writable } from 'svelte/store';
import { stackedFMSStore } from '../stackedFMS';
import { enemyHandStore, playerHandStore } from '../hand';


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

        const battle = get(battleStore);

        if(battle.state === 'init'){

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
        }else{
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
    }

    if(currentState.name === 'battle.next'){

      const playerHand = get(playerHandStore);
      const enemyHand = get(enemyHandStore);
  
      if(playerHand.cards.length > 0){
        const playerCurrentCard = get(playerHandStore).cards[0];
        stackedFMSStore.pushNewState({
          id: '',
          name: 'hand.player.remove-card',
          from: ['battle.next'],
          to: [],
          data: {card: playerCurrentCard}
        });
      }else if(enemyHand.cards.length > 0){
        const enemyCurrentCard = get(enemyHandStore).cards[0];
        stackedFMSStore.pushNewState({
          id: '',
          name: 'hand.enemy.remove-card',
          from: ['battle.next'],
          to: [],
          data: {card: enemyCurrentCard}
        });
      } else {
        battleStore.update(() => ({
          state: 'idle',
        }));

        stackedFMSStore.transitionToState({
          id: '',
          name: 'battle.init',
          from: ['battle.next'],
          to: [],
          data: null
        });
      }
  
    }
  
});