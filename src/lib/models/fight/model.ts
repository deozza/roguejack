import type { Hand } from '$lib/models/hand/model';

export class Fight {
	bonusValueForPlayer: number = 0;
	bonusValueForEnemy: number = 0;
	bonusDamageToPlayer: number = 0;
	bonusDamageToEnemy: number = 0;
	totalDamageToPlayer: number = 0;
	totalDamageToEnemy: number = 0;
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
			playerHand.getValue() + this.bonusValueForPlayer >
			enemyHand.getValue() + this.bonusValueForEnemy
		) {
			this.playerHasWon = true;
			return this;
		} else {
			this.enemyHasWon = true;
			return this;
		}
	}

	public setTotalDamageToPlayer(playerHand: Hand, enemyHand: Hand): Fight {
		if (this.enemyHasWon === false) {
			this.totalDamageToPlayer = 0;
			return this;
		}

		if (playerHand.getIsBusted()) {
			this.totalDamageToPlayer += playerHand.getValue() - 21;
			return this;
		}

		if (enemyHand.getIsBlackjack() === true && playerHand.getIsBlackjack() === false) {
			if (playerHand.getValue() === 21) {
				this.totalDamageToPlayer += 1;
			}
		}

		this.totalDamageToPlayer +=
			enemyHand.getValue() +
			this.bonusValueForEnemy +
			this.bonusDamageToPlayer -
			playerHand.getValue() -
			this.bonusValueForPlayer;
		return this;
	}

	public setTotalDamageToEnemy(playerHand: Hand, enemyHand: Hand): Fight {
		if (this.playerHasWon === false) {
			this.totalDamageToEnemy = 0;

			return this;
		}

		if (enemyHand.getIsBusted()) {
			this.totalDamageToEnemy += enemyHand.getValue() - 21;
			return this;
		}

		if (playerHand.getIsBlackjack() === true && enemyHand.getIsBlackjack() === false) {
			if (enemyHand.getValue() === 21) {
				this.totalDamageToEnemy += 1;
			}
		}

		this.totalDamageToEnemy +=
			playerHand.getValue() +
			this.bonusValueForPlayer +
			this.bonusDamageToEnemy -
			enemyHand.getValue() -
			this.bonusValueForEnemy;
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
