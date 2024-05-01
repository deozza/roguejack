import type {  EnemyStore } from "../character";
import { TurnStore } from "../turn";
import type { DeckStore } from "../deck";

export class BattleStore {
    public enemy: EnemyStore;
    public battleNumber: number = 1;
    public turnNumber: number = 1;
    public state: string = 'idle';
    public turns: Array<TurnStore> = [];

    constructor(enemy: EnemyStore) {
        this.enemy = enemy;
    }

    public initBattle(playerDeck: DeckStore): BattleStore {
        this.state = 'initialization';
        
        const turn: TurnStore = new TurnStore();
        this.state = 'player-drawing';

        for(let i: number = 0; i < 2; i++) {
            turn.playerTurn.addToHandCardTopCardFromDeck(playerDeck);
        }

        this.state = 'enemy-drawing';
        turn.enemyTurn.addToHandCardTopCardFromDeck(this.enemy.deck);
    
        this.turns.push(turn);

        this.state = 'initialized';

        return this;
    }

    public getDamages(): object {
        const playerPower: number = this.player.hand.score;
        const enemyPower: number = this.enemy.hand.score;

        let damagesToPlayer: number = 0;
        let damagesToEnemy: number = 0;

        if(this.player.hand.isBusted === true) {
            damagesToPlayer += playerPower - 21;
        }

        if(this.enemy.hand.isBusted === true) {
            damagesToEnemy += enemyPower - 21;
        }

        if(enemyPower === playerPower) {
            return {
                damagesToPlayer: damagesToPlayer,
                damagesToEnemy: damagesToEnemy
            }
        }

        if(this.player.hand.isBusted === false) {
            if(playerPower > enemyPower) {
                damagesToEnemy += playerPower - enemyPower;
            }

            if(this.player.hand.isBlackJack) {
                damagesToEnemy = damagesToEnemy * 2;
            }
        }

        if(this.enemy.hand.isBusted === false) {
            if(enemyPower > playerPower) {
                damagesToPlayer += enemyPower - playerPower;
            }

            if(this.enemy.hand.isBlackJack) {
                damagesToPlayer = damagesToPlayer * 2;
            }
        }

        return {
            damagesToPlayer: damagesToPlayer,
            damagesToEnemy: damagesToEnemy
        }
    }

    public getDamagesMessage(damages: object): string {
        let damageMessage = '';

        if(damages.damagesToPlayer === 0 && damages.damagesToEnemy === 0) {
            return 'No damages were inflicted.';
        }

        if(damages.damagesToPlayer > 0){
            if(this.player.hand.isBusted) {
                damageMessage += "You inflicted yourself ";
            }else{
                damageMessage += `You took `;
            }

            damageMessage += damages.damagesToPlayer + ' damages. '
            if(this.enemy.hand.isBlackJack){
                damageMessage += "Critical hit ! ";
            }
        }

        if(damages.damagesToEnemy > 0){
            if(this.enemy.hand.isBusted) {
                damageMessage += "The enemy inflicted itself ";
            }else{
                damageMessage += `You inflicted `;
            }

            damageMessage += damages.damagesToEnemy + ' damages. '
            if(this.enemy.hand.isBlackJack){
                damageMessage += "Critical hit ! ";
            }
        }

        return damageMessage;
    }
}