import { Battle } from '$lib/models/battle/model';
import type { Card } from '$lib/models/card/model';
import { characters as semiboss } from '$lib/models/character/enemies/semiboss';
import { characters as basic } from '$lib/models/character/enemies/basic';
import { characters as boss } from '$lib/models/character/enemies/boss';
import { Character } from '$lib/models/character/model';
import { Game } from '$lib/models/game/model';
import type { Hand } from '$lib/models/hand/model';
import { Turn } from '$lib/models/turn/model';
import { get } from 'svelte/store';
import { writable } from 'svelte/store';
import type EffectInterface from '$lib/models/effect/effectInterface';
import { delay } from '$lib/utils';

function createGameStore() {
	const { subscribe, set, update } = writable<Game>(new Game());

	const reset = () => {
		set(new Game());
	};

	const setPlayer = (characterChosen: object) => {
		const player = new Character();
		player.generateCharacter(characterChosen);

		update((game) => {
			game.player = player;
			return game;
		});
	};

	const createBattle = () => {
		update((game) => {
			const enemy: Character = generateEnemy(game);

			const battle = new Battle(enemy, game.battles.length + 1);
			game.addBattle(battle);
			game.player.deck.shuffleDeck();
			return game;
		});
	};

	const generateEnemy = (game: Game): Character => {
		const enemy: Character = new Character();
		const enemyLevel: number = Math.max(Math.ceil(game.battles.length / 10), 1);
		let enemyModels: object[] = [];

		if ((game.battles.length + 1) % 10 === 0) {
			enemyModels = boss.filter(
				(character) => character.level <= enemyLevel && character.level >= enemyLevel - 1
			);
		} else if ((game.battles.length + 1) % 5 === 0) {
			enemyModels = semiboss.filter(
				(character) => character.level <= enemyLevel && character.level >= enemyLevel - 1
			);
		} else {
			enemyModels = basic.filter(
				(character) => character.level <= enemyLevel && character.level >= enemyLevel - 1
			);
		}

		const enemyModel = enemyModels[Math.floor(Math.random() * enemyModels.length)];
		enemy.generateCharacter(enemyModel);

		return enemy;
	};

	const createTurn = (user: string) => {
		update((game) => {
			if (game.getCurrentBattle() === null) {
				throw new Error('No battle to create turn');
			}

			const turn: Turn = new Turn(game.getCurrentBattle().turns.length + 1);
			game.getCurrentBattle().addTurn(turn);

			return game;
		});

		if (user === 'player') {
			playerDrawCard();
			playerDrawCard();
		}
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

	const enemyAutoDraw = async () => {
		const game = get(gameStore);

		while (
			game.getCurrentBattle().getCurrentTurn().enemyHand.getValue() <
			game.getCurrentBattle().enemy.minAttack
		) {
			await delay(1000);
			enemyDrawCard();
		}
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

	const addToInventory = (object: EffectInterface, user: string) => {
		update((game) => {
			game.player.inventory = [...game.player.inventory, object];
			return game;
		});
	};

	const removeFromInventory = (object: EffectInterface, user: string) => {
		update((game) => {
			const index = game.player.inventory.findIndex((item) => item === object);
			if (index !== -1) {
				game.player.inventory.splice(index, 1);
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
		enemyAutoDraw,
		updateFightData,
		inflictDamagesToPlayer,
		inflictDamagesToEnemy,
		endTurn,
		healPercentages,
		recycleDiscard,
		addToInventory,
		removeFromInventory
	};
}

export const gameStore = createGameStore();
