import { get, writable } from 'svelte/store';
import { enemyHandStore, playerHandStore } from '../hand';
import type { Card } from '../card';
import { stackedFMSStore } from '../stackedFMS';
import { enemyCharacterStore, playerCharacterStore } from '../character';

export type CharacterTurn = {
  score: number,
  isBusted: boolean,
  isBlackJack: boolean
}

export type Turn = {
  playerTurn: CharacterTurn,
  enemyTurn: CharacterTurn,
  state: string
}

export const createTurnStore = () => {
  const { update, subscribe } = writable<Turn>({
    playerTurn: {
      score: 0,
      isBusted: false,
      isBlackJack: false
    },
    enemyTurn: {
      score: 0,
      isBusted: false,
      isBlackJack: false
    },
    state: 'idle'
  });

  function updatePlayerScore() {
    const playerHand = get(playerHandStore);
    const { score, isBusted, isBlackJack } = calculateScoreAccordingToHand(playerHand.cards);
    update((store) => ({
      ...store,
      playerTurn: {
        score,
        isBusted,
        isBlackJack
      }
    }));
  }

  function updateEnemyScore() {
    const enemyHand = get(enemyHandStore);
    const { score, isBusted, isBlackJack } = calculateScoreAccordingToHand(enemyHand.cards);
    update((store) => ({
      ...store,
      enemyTurn: {
        score,
        isBusted,
        isBlackJack
      }
    }));
  }

  function updateState(state: string) {
    update((store) => ({
      ...store,
      state
    }));
  }

  return {
    subscribe,
    updatePlayerScore,
    updateEnemyScore,
    updateState
  };
}

export const turnStore = createTurnStore();

function calculateScoreAccordingToHand(cards: Array<Card>) {
  let score = 0;
  let isBlackJack = false;
  let isBusted = false;
  let figuresCount: number = 0;
  let acesCount: number = 0;
  const aceValue: number = 11;

  cards.forEach((card: Card) => {
      const { numberValue, figureValue } = card;
      if (numberValue === 1) {
          acesCount++;
      } else if (numberValue !== null && numberValue > 1) {
          score += numberValue;
      } else if (figureValue) {
          score += 10;
          figuresCount++;
      }
  })

  if(cards.length === 2 && figuresCount === 1 && acesCount === 1) {
      isBlackJack = true;
      score = 21;
      return { score, isBlackJack, isBusted };
  }

  for(let i: number = 1; i <= acesCount; i++) {
      if (score + aceValue > 21) {
          score += 1;
      } else {
          score += aceValue;
      }
  }

  if(score > 21) {
      isBusted = true;
  }

  return { score, isBlackJack, isBusted };
}

stackedFMSStore.subscribe((states) => {
  const currentState = states[states.length - 1];

  if(currentState === undefined){
    return;
  }

  if(currentState.name === 'turn.start'){
      stackedFMSStore.transitionToState({
        id: '',
        name: 'turn.player.init',
        from: ['turn.start'],
        to: [],
        data: null
      });
  }

  if(currentState.name === 'turn.player.init'){
    if(get(playerHandStore).cards.length < 2){
      stackedFMSStore.pushNewState({
        id: '',
        name: 'deck.player.draw-top-card',
        from: ['turn.player.init'],
        to: [],
        data: null
      });  
    }else{
      stackedFMSStore.transitionToState({
        id: '',
        name: 'turn.enemy.init',
        from: ['turn.player.init'],
        to: [],
        data: null
      });
    }
  }

  if(currentState.name === 'turn.enemy.init'){
    if(get(enemyHandStore).cards.length < 1){
      stackedFMSStore.pushNewState({
        id: '',
        name: 'deck.enemy.draw-top-card',
        from: ['turn.enemy.init'],
        to: [],
        data: null
      });  
    }else{
      stackedFMSStore.transitionToState({
        id: '',
        name: 'turn.playing',
        from: ['turn.enemy.init'],
        to: [],
        data: null
      });
    }
  }

  if(currentState.name === 'turn.player.draw'){
    stackedFMSStore.transitionToState({
      id: '',
      name: 'deck.player.draw-top-card',
      from: ['turn.playing'],
      to: [],
      data: null
    });
  }

  if(currentState.name === 'turn.player.calculate-score'){
    turnStore.updatePlayerScore();
    stackedFMSStore.removeTopState();
  }

  if(currentState.name === 'turn.enemy.calculate-score'){
    turnStore.updateEnemyScore();
    stackedFMSStore.removeTopState();
  }

  if(currentState.name === 'turn.fight'){
    stackedFMSStore.transitionToState({
      id: '',
      name: 'turn.enemy.auto-draw',
      from: ['turn.fight'],
      to: [],
      data: null
    });
  }

  if(currentState.name === 'turn.enemy.auto-draw'){
    if(get(turnStore).enemyTurn.score < 17){
      stackedFMSStore.pushNewState({
        id: '',
        name: 'deck.enemy.draw-top-card',
        from: ['turn.enemy.auto-draw'],
        to: [],
        data: null
      });
    }else{
      stackedFMSStore.transitionToState({
        id: '',
        name: 'turn.fight.damage-step',
        from: ['turn.enemy.auto-draw'],
        to: [],
        data: null
      });
    }
  }

  if(currentState.name === 'turn.fight.damage-step'){
    const turn = get(turnStore);
    let damagesToPlayer: number = 0;
    let damagesToEnemy: number = 0;
    if(turn.playerTurn.isBusted){
      damagesToPlayer = turn.playerTurn.score - 21;
    }else if(turn.enemyTurn.isBusted === false){
      if(turn.enemyTurn.score > turn.playerTurn.score){
        damagesToPlayer = turn.enemyTurn.score - turn.playerTurn.score;
        if(turn.enemyTurn.isBlackJack){
          damagesToPlayer = damagesToEnemy * 2;
        }
      }
    }

    if(turn.enemyTurn.isBusted){
      damagesToEnemy = turn.enemyTurn.score - 21;
    }else if(turn.playerTurn.isBusted === false){
      if(turn.playerTurn.score > turn.enemyTurn.score){
        damagesToEnemy = turn.playerTurn.score - turn.enemyTurn.score;
        if(turn.enemyTurn.isBlackJack){
          damagesToEnemy = damagesToEnemy * 2;
        }
      }
    }

    playerCharacterStore.dealDamage(damagesToPlayer);
    enemyCharacterStore.dealDamage(damagesToEnemy);
    const damageMessage: string = getDamagesMessage(damagesToPlayer, damagesToEnemy, turn);

    stackedFMSStore.transitionToState({
      id: '',
      name: 'turn.end',
      from: ['turn.fight.damage-step'],
      to: [],
      data: {
        turn,
        damagesToPlayer,
        damagesToEnemy,
        damageMessage
      }
    });
  }

});

function getDamagesMessage(damagesToPlayer: number, damagesToEnemy: number, turn: Turn): string {
  let damageMessage = '';

  if(damagesToPlayer === 0 && damagesToEnemy === 0) {
      return 'No damages were inflicted.';
  }

  if(damagesToPlayer > 0){
      if(turn.playerTurn.isBusted) {
          damageMessage += "You inflicted yourself ";
      }else{
          damageMessage += `You took `;
      }

      damageMessage += damagesToPlayer + ' damages. '
      if(turn.enemyTurn.isBlackJack){
          damageMessage += "Critical hit ! ";
      }
  }

  if(damagesToEnemy > 0){
      if(turn.enemyTurn.isBusted) {
          damageMessage += "The enemy inflicted itself ";
      }else{
          damageMessage += `You inflicted `;
      }

      damageMessage += damagesToEnemy + ' damages. '
      if(turn.playerTurn.isBlackJack){
          damageMessage += "Critical hit ! ";
      }
  }

  return damageMessage;
}