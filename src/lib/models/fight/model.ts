import type { Hand } from '$lib/models/hand/model';

export class Fight {
	basePowerForPlayer: number = 0;
	basePowerForEnemy: number = 0;
	baseDamageToPlayer: number = 0;
	baseDamageToEnemy: number = 0;
	multiplierForPlayer: number = 1;
	multiplierForEnemy: number = 1;
	playerHasWon: boolean = false;
	enemyHasWon: boolean = false;

	public setWinner(playerHand: Hand, enemyHand: Hand): Fight {
		if (playerHand.getIsBusted()) {
			this.enemyHasWon = true;
			return this;
		}

		if (enemyHand.getIsBusted()) {
			this.playerHasWon = true;
			return this;
		}

		if (playerHand.getIsBlackjack() && enemyHand.getIsBlackjack()) {
			return this;
		}

		if (playerHand.getIsBlackjack()) {
			this.playerHasWon = true;
			return this;
		}

		if (enemyHand.getIsBlackjack()) {
			this.enemyHasWon = true;
			return this;
		}

		if (
			playerHand.getValue() + this.basePowerForPlayer >
			enemyHand.getValue() + this.basePowerForEnemy
		) {
			this.playerHasWon = true;
			return this;
		}else{
			this.enemyHasWon = true;
			return this;	
		}

	}

	public setBaseDamageToPlayer(playerHand: Hand, enemyHand: Hand): Fight {
		if (this.enemyHasWon === false) {
			this.baseDamageToPlayer = 0;
			return this;
		}

		if (playerHand.getIsBusted()) {
			this.baseDamageToPlayer += playerHand.getValue() - 21;
			return this;
		}

		this.baseDamageToPlayer +=
			enemyHand.getValue() +
			this.basePowerForEnemy -
			playerHand.getValue() -
			this.basePowerForPlayer;
		return this;
	}

	public setBaseDamageToEnemy(playerHand: Hand, enemyHand: Hand): Fight {
		if (this.playerHasWon === false) {
			this.baseDamageToEnemy = 0;

			return this;
		}

		if (enemyHand.getIsBusted()) {
			this.baseDamageToEnemy += enemyHand.getValue() - 21;
			return this;
		}

		this.baseDamageToEnemy +=
			playerHand.getValue() +
			this.basePowerForPlayer -
			enemyHand.getValue() -
			this.basePowerForEnemy;
		return this;
	}

	public setMultiplierForPlayer(playerHand: Hand): Fight {
		if (this.playerHasWon && playerHand.getIsBlackjack()) {
			this.multiplierForPlayer += 1;
		}
		return this;
	}

	public setMultiplierForEnemy(enemyHand: Hand): Fight {
		if (this.enemyHasWon && enemyHand.getIsBlackjack()) {
			this.multiplierForEnemy += 1;
		}
		return this;
	}
}
