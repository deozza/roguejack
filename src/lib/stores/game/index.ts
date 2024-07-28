import { Battle } from '$lib/models/battle/model';
import type { Card } from '$lib/models/card/model';
import { Game } from '$lib/models/game/model';
import type { Hand } from '$lib/models/hand/model';
import { Turn } from '$lib/models/turn/model';
import { writable } from 'svelte/store';
import { getRandomEnemyByLevelAndType, type Enemy } from '$lib/models/characters/enemies';
import { EnnemyType } from '$lib/models/characters/types';
import type { Player } from '$lib/models/characters/players';
import type { ItemTypes } from '$lib/models/items/types';
import type { Status } from '$lib/models/effects/interfaces';

function createGameStore() {
	const { subscribe, set, update } = writable<Game>(new Game());

	const reset = () => {
		set(new Game());
	};

	const setPlayer = (chosenPlayer: Player) => {
		update((game) => {
			game.player = chosenPlayer;
			return game;
		});
	};

	const createBattle = () => {
		update((game) => {
			const nextBattleIndex: number = game.battles.length + 1;
			let nextBattleEnemyType: EnnemyType = EnnemyType.standard;
			let nextBattleEnemyLevel: number = Math.max(Math.floor(nextBattleIndex / 10), 1);

			if (nextBattleIndex % 10 === 0) {
				nextBattleEnemyType = EnnemyType.boss;
			}

			if (nextBattleIndex % 5 === 0 && nextBattleIndex % 10 !== 0) {
				nextBattleEnemyType = EnnemyType.miniboss;
			}

			const enemy: Enemy = getRandomEnemyByLevelAndType(nextBattleEnemyLevel, nextBattleEnemyType);
			enemy.deck.shuffleDeck();
			const battle = new Battle(enemy, nextBattleIndex);
			game.addBattle(battle);
			game.player.deck.shuffleDeck();
			return game;
		});
	};

	const createTurn = () => {
		update((game) => {
			if (game.getCurrentBattle() === null) {
				throw new Error('No battle to create turn');
			}

			const turn: Turn = new Turn(game.getCurrentBattle().turns.length + 1);
			game.getCurrentBattle().addTurn(turn);

			return game;
		});

		playerDrawCard();
		playerDrawCard();
	};

	const playerDrawCard = () => {
		update((game) => {
			let card: Card | null = game.player.deck.drawTopCard();
			if (card === null) {
				throw new Error('PLAYER_EMPTY_DECK');
			}
			game.getCurrentBattle().getCurrentTurn().playerHand.addCard(card);

			return game;
		});
	};

	const enemyDrawCard = () => {
		update((game) => {
			let card: Card | null = game.getCurrentBattle().enemy.deck.drawTopCard();
			if (card === null) {
				throw new Error('ENEMY_EMPTY_DECK');
			}
			game.getCurrentBattle().getCurrentTurn().enemyHand.addCard(card);

			return game;
		});
	};

	const updateFightData = () => {
		update((game) => {
			const playerHand: Hand = game.getCurrentBattle()?.getCurrentTurn().playerHand;
			const enemyHand: Hand = game.getCurrentBattle()?.getCurrentTurn().enemyHand;

			game
				.getCurrentBattle()
				?.getCurrentTurn()
				.fight.setWinner(playerHand, enemyHand)
				.setBaseDamageToEnemy(playerHand, enemyHand)
				.setBaseDamageToPlayer(playerHand, enemyHand)
				.setMultiplierForEnemy(enemyHand)
				.setMultiplierForPlayer(playerHand);

			return game;
		});
	};

	const inflictDamagesToEnemy = (damages: number) => {
		update((game) => {
			game.getCurrentBattle().enemy.takeDamage(damages);
			return game;
		});
	};

	const inflictDamagesToPlayer = (damages: number) => {
		update((game) => {
			game.player.takeDamage(damages);
			return game;
		});
	};

	const endTurn = () => {
		update((game) => {
			game
				.getCurrentBattle()
				.getCurrentTurn()
				.playerHand.cards.forEach((card: Card) => {
					game.player.discard.discardCard(card);
				});

			game
				.getCurrentBattle()
				.getCurrentTurn()
				.enemyHand.cards.forEach((card: Card) => {
					game.getCurrentBattle()?.enemy.discard.discardCard(card);
				});

			return game;
		});
	};

	const healPercentages = (percentage: number, user: string) => {
		update((game) => {
			const healNumber: number = Math.floor((game.player.maxHealth / 100) * percentage);

			if (user === 'player') {
				game.player.heal(healNumber);
			} else {
				game.getCurrentBattle().enemy.heal(healNumber);
			}

			return game;
		});
	};

	const recycleDiscard = (numberOfCards: number, user: string) => {
		update((game) => {
			if (user === 'player') {
				for (let i = 0; i < numberOfCards; i++) {
					const card: Card | null = game.player.discard.drawTopCard();
					if (card === null) {
						game.player.deck.shuffleDeck();
						return game;
					}
					game.player.deck.putCardOnTop(card);
				}
				game.player.deck.shuffleDeck();
			} else {
				for (let i = 0; i < numberOfCards; i++) {
					const card: Card | null = game.getCurrentBattle().enemy.discard.drawTopCard();
					if (card === null) {
						game.player.deck.shuffleDeck();
						return game;
					}
					game.getCurrentBattle().enemy.deck.putCardOnTop(card);
				}
				game.player.deck.shuffleDeck();
			}

			return game;
		});
	};

	const addToInventory = (object: ItemTypes, user: string) => {
		update((game) => {
			if (user === 'enemy') {
				const index: number = game
					.getCurrentBattle()
					.enemy.inventory.findIndex(
						(item: ItemTypes) => item.technicalName === object.technicalName
					);
				if (index === -1) {
					object.currentAmount = object.defaultAmount;
					game.getCurrentBattle().enemy.inventory = [
						...game.getCurrentBattle().enemy.inventory,
						object
					];
					return game;
				}

				game.getCurrentBattle().enemy.inventory[index].currentAmount += object.defaultAmount;
				return game;
			}

			const index: number = game.player.inventory.findIndex(
				(item: ItemTypes) => item.technicalName === object.technicalName
			);
			if (index === -1) {
				object.currentAmount = object.defaultAmount;
				game.player.inventory = [...game.player.inventory, object];
				return game;
			}

			game.player.inventory[index].currentAmount += object.defaultAmount;
			return game;
		});
	};

	const removeFromInventory = (object: ItemTypes, user: string) => {
		update((game) => {
			const index = game.player.inventory.findIndex((item) => item === object);
			if (index === -1) {
				return game;
			}

			game.player.inventory[index].currentAmount -= 1;
			if (game.player.inventory[index].currentAmount <= 0) {
				game.player.inventory.splice(index, 1);
			}

			return game;
		});
	};

	const addCardToDeck = (card: Card, user: string) => {
		update((game) => {
			if (user === 'player') {
				game.player.deck.putCardOnTop(card);
				return game;
			}
			game.getCurrentBattle().enemy.deck.putCardOnTop(card);
			return game;
		});
	};

	const shuffleDeck = (user: string) => {
		update((game) => {
			if (user === 'player') {
				game.player.deck.shuffleDeck();
				return game;
			}
			game.getCurrentBattle().enemy.deck.shuffleDeck();
			return game;
		});
	};

	const resolveFight = () => {
		update((game) => {
			const playerHand: Hand = game.getCurrentBattle().getCurrentTurn().playerHand;
			const enemyHand: Hand = game.getCurrentBattle().getCurrentTurn().enemyHand;

			game.getCurrentBattle().getCurrentTurn().fight.setWinner(playerHand, enemyHand);
			game.getCurrentBattle().getCurrentTurn().fight.setTotalDamageToEnemy(playerHand, enemyHand);
			game.getCurrentBattle().getCurrentTurn().fight.setMultiplierForPlayer(playerHand);
			game.getCurrentBattle().getCurrentTurn().fight.setTotalDamageToPlayer(playerHand, enemyHand);
			game.getCurrentBattle().getCurrentTurn().fight.setMultiplierForEnemy(enemyHand);
			return game;
		});
	};

	const addStatusToPlayer = (statusToAdd: Status) => {
		update((game) => {
			const index: number = game.player.status.findIndex(
				(status: Status) => status.technicalName === statusToAdd.technicalName
			);
			if (index === -1) {
				statusToAdd.currentAmount = statusToAdd.defaultAmount;
				game.player.status = [...game.player.status, statusToAdd];
				return game;
			}

			game.player.status[index].currentAmount += statusToAdd.defaultAmount;
			return game;
		});
	};

	const addStatusToEnemy = (statusToAdd: Status) => {
		update((game) => {
			const index: number = game
				.getCurrentBattle()
				.enemy.status.findIndex(
					(status: Status) => status.technicalName === statusToAdd.technicalName
				);
			if (index === -1) {
				statusToAdd.currentAmount = statusToAdd.defaultAmount;
				game.getCurrentBattle().enemy.status = [
					...game.getCurrentBattle().enemy.status,
					statusToAdd
				];
				return game;
			}

			game.getCurrentBattle().enemy.status[index].currentAmount += statusToAdd.defaultAmount;
			return game;
		});
	};

	const removeStatusFromPlayer = (statusToRemove: Status) => {
		update((game: Game) => {
			const index = game.player.status.findIndex((status: Status) => status.technicalName === statusToRemove.technicalName);

			if (index === -1) {
				return game;
			}

			game.player.status[index].currentAmount -= 1;
			if (game.player.status[index].currentAmount <= 0) {
				game.player.status.splice(index, 1);
			}

			return game;
		});
	};

	const removeStatusFromEnemy = (statusToRemove: Status) => {
		update((game: Game) => {
			const index = game
				.getCurrentBattle()
				?.enemy.status.findIndex((status: Status) => status.technicalName === statusToRemove.technicalName);
			if (index === -1) {
				return game;
			}

			game.plagetCurrentBattle().enemyyer.status[index].currentAmount -= 1;
			if (game.getCurrentBattle().enemy.status[index].currentAmount <= 0) {
				game.getCurrentBattle().enemy.status.splice(index, 1);
			}

			return game;
		});
	};

	return {
		subscribe,
		reset,
		update,
		setPlayer,
		createBattle,
		createTurn,
		playerDrawCard,
		enemyDrawCard,
		updateFightData,
		inflictDamagesToPlayer,
		inflictDamagesToEnemy,
		endTurn,
		healPercentages,
		recycleDiscard,
		addToInventory,
		removeFromInventory,
		resolveFight,
		addCardToDeck,
		shuffleDeck,
		addStatusToPlayer,
		addStatusToEnemy,
		removeStatusFromPlayer,
		removeStatusFromEnemy
	};
}

export const gameStore = createGameStore();
