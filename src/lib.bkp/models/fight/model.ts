import type { Hand } from '$lib/models/hand/model';
import { Damage } from '../damage/model';

export class Fight {
	damageOfPlayer: Damage = new Damage();
	damageOfEnemy: Damage = new Damage();
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
			playerHand.getValue() + this.damageOfPlayer.bonusValue >
			enemyHand.getValue() + this.damageOfEnemy.bonusValue
		) {
			this.playerHasWon = true;
			return this;
		} else {
			this.enemyHasWon = true;
			return this;
		}
	}

	public setTotalDamageOfEnemy(playerHand: Hand, enemyHand: Hand): Fight {
		if (this.enemyHasWon === false) {
			this.damageOfEnemy.totalDamage = 0;
			return this;
		}

		if (playerHand.getIsBusted()) {
			this.damageOfEnemy.totalDamage += playerHand.getValue() - 21;
			return this;
		}

		if (enemyHand.getIsBlackjack() === true && playerHand.getIsBlackjack() === false) {
			if (playerHand.getValue() === 21) {
				this.damageOfEnemy.totalDamage += 1;
			}
		}

		this.damageOfEnemy.totalDamage +=
			enemyHand.getValue() +
			this.damageOfEnemy.bonusValue +
			this.damageOfEnemy.bonusDamage -
			playerHand.getValue() -
			this.damageOfEnemy.bonusValue;
		return this;
	}

	public setTotalDamageOfPlayer(playerHand: Hand, enemyHand: Hand): Fight {
		if (this.playerHasWon === false) {
			this.damageOfPlayer.totalDamage = 0;

			return this;
		}

		if (enemyHand.getIsBusted()) {
			this.damageOfPlayer.totalDamage += enemyHand.getValue() - 21;
			return this;
		}

		if (playerHand.getIsBlackjack() === true && enemyHand.getIsBlackjack() === false) {
			if (enemyHand.getValue() === 21) {
				this.damageOfPlayer.totalDamage += 1;
			}
		}

		this.damageOfPlayer.totalDamage +=
			playerHand.getValue() +
			this.damageOfPlayer.bonusValue +
			this.damageOfPlayer.bonusDamage -
			enemyHand.getValue() -
			this.damageOfPlayer.bonusValue;
		return this;
	}

	public setMultiplierForPlayer(playerHand: Hand): Fight {
		if (this.playerHasWon && playerHand.getIsBlackjack()) {
			this.damageOfPlayer.multiplier += 1;
		}
		return this;
	}

	public setMultiplierForEnemy(enemyHand: Hand): Fight {
		if (this.enemyHasWon && enemyHand.getIsBlackjack()) {
			this.damageOfPlayer.multiplier += 1;
		}
		return this;
	}
}
