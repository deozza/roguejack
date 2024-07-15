import type { Hand } from "../hand/model";

export class Fight {
    baseDamageToPlayer: number = 0;
    baseDamageToEnemy: number = 0;
    multiplierForPlayer: number = 1;
    multiplierForEnemy: number = 1;
    playerHasWon: boolean = false;
    enemyHasWon: boolean = false;

    public setWinner(playerHand: Hand, enemyHand: Hand): Fight {
        if(playerHand.getIsBusted()) {
            this.enemyHasWon = true;
            return this;
        }

        if(enemyHand.getIsBusted()) {
            this.playerHasWon = true;
            return this;
        }

        if(playerHand.getValue() > enemyHand.getValue()) {
            this.playerHasWon = true;
            return this;
        }

        this.enemyHasWon = true;
        return this;
    }

    public setBaseDamageToPlayer(playerHand: Hand, enemyHand: Hand): Fight {
        if(this.enemyHasWon === false) {
            return this;
        }

        if(playerHand.getIsBusted()) {
            this.baseDamageToPlayer = playerHand.getValue() - 21;
            return this;
        }

        this.baseDamageToPlayer = enemyHand.getValue() - playerHand.getValue();
        return this;
    }

    public setBaseDamageToEnemy(playerHand: Hand, enemyHand: Hand): Fight {
        if(this.playerHasWon === false) {
            return this;
        }

        if(enemyHand.getIsBusted()) {
            this.baseDamageToEnemy = enemyHand.getValue() - 21;
            return this;
        }

        this.baseDamageToEnemy = playerHand.getValue() - enemyHand.getValue();
        return this;
    }

    public setMultiplierForPlayer(playerHand: Hand): Fight {
        if(this.playerHasWon && playerHand.getIsBlackjack()){
            this.multiplierForPlayer = 2;
        }
        return this;
    }

    public setMultiplierForEnemy(enemyHand: Hand): Fight {
        if(this.enemyHasWon && enemyHand.getIsBlackjack()){
            this.multiplierForEnemy = 2;
        }
        return this;
    }

}