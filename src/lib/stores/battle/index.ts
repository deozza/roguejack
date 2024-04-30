import { writable } from "svelte/store";
import type { CharacterStore, EnemyStore } from "../character";

export class BattleStore {
    public player: CharacterStore;
    public enemy: EnemyStore;
    public battleNumber: number = 1;
    public turnNumber: number = 1;
    public battleState: string = 'started';

    constructor(player: CharacterStore, enemy: EnemyStore) {
        this.player = player;
        this.enemy = enemy;
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
}

export const battleStore = writable<BattleStore|null>(null);