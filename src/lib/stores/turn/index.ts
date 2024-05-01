import { get, writable } from 'svelte/store';
import { messageBusStore } from '../messageBus';
import { enemyHandStore, playerHandStore } from '../hand';
import type { Card } from '../card';
import { enemyDeckStore } from '../deck';

type CharacterTurn = {
  score: number,
  isBusted: boolean,
  isBlackJack: boolean
}

type Turn = {
  playerTurn: CharacterTurn,
  enemyTurn: CharacterTurn,
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
    }
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

  return {
    subscribe,
    updatePlayerScore,
    updateEnemyScore
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

messageBusStore.subscribe((events) => {
    events.forEach((event) => {

        if(event.state !== 'sent'){
            return;
        }

        if(event.event === 'init-turn'){
            messageBusStore.set([])
            messageBusStore.updateEventState(event.id, 'pending');
            messageBusStore.addEvent('player-draw');
            messageBusStore.addEvent('player-draw');
            messageBusStore.addEvent('enemy-draw');
            messageBusStore.updateEventState(event.id, 'resolved');
            
            messageBusStore.addEvent('turn-initiated');            
        }

        if(event.event === 'player-card-added-to-hand'){
          event.state = 'resolved';
          turnStore.updatePlayerScore();
          messageBusStore.addEvent('player-score-updated', null, 'resolved');
        }

        if(event.event === 'enemy-card-added-to-hand'){
          event.state = 'resolved';
          turnStore.updateEnemyScore();
          messageBusStore.addEvent('enemy-score-updated', null, 'resolved');
        }

        if(event.event === 'init-fight'){
          messageBusStore.updateEventState(event.id, 'pending');
          turnStore.subscribe((value) => {
            if(value.enemyTurn.score < 17){
              const card: Card | null = enemyDeckStore.drawTopCard(enemyDeckStore.get(enemyDeckStore));
              if(card === null){
                messageBusStore.addEvent('enemy-deck-empty');
              }else{
                enemyHandStore.addToHand(card);
                turnStore.updateEnemyScore();
              }
            }
          })
        }

    });
})