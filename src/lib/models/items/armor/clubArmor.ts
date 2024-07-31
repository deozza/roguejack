import { suits } from '$lib/models/card/model';
import type { Damage } from '$lib/models/damage/model';
import { Categories, Types } from '$lib/models/effects/enums';
import type { EffectInterface } from '$lib/models/effects/interfaces';
import type { Fight } from '$lib/models/fight/model';
import type { Game } from '$lib/models/game/model';
import { Rarities } from '$lib/models/items/enums';
import type { ArmorInterface } from '$lib/models/items/interfaces';
import { gameStore } from '$lib/stores/game';
import { get } from 'svelte/store';

export default class ClubArmor implements ArmorInterface {
	id: string = crypto.randomUUID();
	category: Categories = Categories.neutral;
	type: Types = Types.physical;
	effects: EffectInterface[] = [];
	technicalName: string = 'clubArmor';
	name: string = 'Club armor';
	description: string = 'Reduces damages of 1 point when opposing hand contains a club card.';
	icon: string = 'game-icons:chest-armor';
	rarity: Rarities = Rarities.common;
	weakToType: Types[] = [];
	strongToType: Types[] = [];
	resistantTo: Types[] = [];
	defaultAmount = 3;
	currentAmount: number = 3;

	applyEffects(calledBy: 'player' | 'enemy', damage: Damage | null = null): Damage {
		const fight: Fight = get(gameStore).getCurrentBattle().getCurrentTurn().fight;
		const playerHand = get(gameStore).getCurrentBattle().getCurrentTurn().playerHand;
		const enemyHand = get(gameStore).getCurrentBattle().getCurrentTurn().enemyHand;

		if(calledBy === 'player') {
			if(damage === null) {
				damage = fight.damageOfEnemy;
			}

			if(damage.totalDamage <= 0) {
				return damage;
			}

			if(playerHand.getIsBusted() === true) {
				return damage;
			}
			
			if(enemyHand.cards.find(card => card.suit === suits.club)) {
				if(damage.totalDamage >= this.currentAmount) {
					damage.totalDamage -= this.currentAmount;
					this.currentAmount = 0;
				}else{
					this.currentAmount -= damage.totalDamage;
					damage.totalDamage = 0;
				}

				gameStore.update((game: Game) => {
					game.getCurrentBattle().getCurrentTurn().fight = fight;
					return game;
				})
			}

			return damage;

		}

		if(damage === null) {
			damage = fight.damageOfPlayer;
		}

		if(damage.totalDamage <= 0){
			return damage;
		}

		if(enemyHand.getIsBusted() === true) {
			return damage;
		}

		if(playerHand.cards.find(card => card.suit === suits.club)) {
			if(damage.totalDamage > this.currentAmount) {
				damage.totalDamage -= this.currentAmount;
				this.currentAmount = 0;
			}else{
				this.currentAmount -= damage.totalDamage;
				damage.totalDamage = 0;
			}

			gameStore.update((game: Game) => {
				game.getCurrentBattle().getCurrentTurn().fight = fight;
				return game;
			})
		}

		return damage;
		
	}

	make(): ArmorInterface {
		return new ClubArmor();
	}
}
