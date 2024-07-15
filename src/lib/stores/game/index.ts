import { Battle } from "$lib/models/battle/model";
import type { Card } from "$lib/models/card/model";
import { characters } from "$lib/models/character/enemies";
import { Character } from "$lib/models/character/model";
import type { Deck } from "$lib/models/deck/model";
import { Game } from "$lib/models/game/model";
import { Turn } from "$lib/models/turn/model";
import { writable } from 'svelte/store';


function createGameStore() {
	const { subscribe, set, update } = writable<Game>(new Game());

    const reset = () => {
        set(new Game())
    }

	const setPlayer = (characterChosen: object) => {
		const player = new Character();
		player.generateCharacter(characterChosen);
		
		update(game => {
			game.player = player;
			return game;
		});
	}

	const createBattle = () => {
		update(game => {
			const enemy: Character = generateEnemy(game);
	
			const battle = new Battle(enemy, game.battles.length + 1);
			game.addBattle(battle);
			return game;
		});
	}

	const generateEnemy = (game: Game): Character => {
		const enemy: Character = new Character();
		const enemyLevel: number = Math.max(Math.round(game.battles.length / 5), 1);
		const enemyModels = characters.filter((character) => character.level <= enemyLevel && character.level >= enemyLevel - 1);

		const enemyModel = enemyModels[Math.floor(Math.random() * enemyModels.length)];
		enemy.generateCharacter(enemyModel);

		return enemy;
	}

	const createTurn = () => {
		update(game => {

			if(game.getCurrentBattle() === null) {
				throw new Error('No battle to create turn');
			}

			const turn: Turn = new Turn(game.getCurrentBattle().turns.length + 1);
			game.getCurrentBattle().addTurn(turn);

			return game;
		});

		playerDrawCard();
		playerDrawCard();
	}

	const playerDrawCard = () => {
		update(game => {
			let card: Card | null = game.player.deck.drawTopCard();
			if(card === null) {
				throw new Error('PLAYER_EMPTY_DECK');
			}
			game.getCurrentBattle().getCurrentTurn().playerHand.addCard(card);

			return game;
		});
	}

	const enemyDrawCard = () => {
		update(game => {
			let card: Card | null = game.getCurrentBattle().enemy.deck.drawTopCard();
			if(card === null) {
				throw new Error('ENEMY_EMPTY_DECK');
			}
			game.getCurrentBattle().getCurrentTurn().enemyHand.addCard(card);

			return game;
		});
	}

	const enemyAutoDraw = () => {
		subscribe(game => {
			if(game.getCurrentBattle().getCurrentTurn().enemyHand.getValue() <= game.getCurrentBattle().enemy.minAttack) {
				enemyDrawCard();
			}

			return game;
		});
	}

	const inflictDamagesToBustedPlayer = () => {
		update(game => {
			const damages: number = game.getCurrentBattle().getCurrentTurn().playerHand.getValue() - 21;
			game.player.takeDamage(damages);
			return game;
		});
	}

	const inflictDamagesToBustedEnemy = () => {
		subscribe(game => {
			const damages: number = game.getCurrentBattle().getCurrentTurn().enemyHand.getValue() - 21;
			
			inflictDamagesToEnemy(damages);
			return game;
		});
	}
	
	const inflictDamagesToEnemy = (damages: number) => {
		update(game => {
			game.getCurrentBattle().enemy.takeDamage(damages);
			return game;
		});
	}

	const inflictDamagesToPlayer = (damages: number) => {
		update(game => {
			game.player.takeDamage(damages);
			return game;
		});
	}

	return {
		subscribe,
		reset,
		setPlayer,
		createBattle,
		createTurn,
		playerDrawCard,
		enemyAutoDraw,
		inflictDamagesToBustedPlayer,
		inflictDamagesToBustedEnemy,
		inflictDamagesToPlayer,
		inflictDamagesToEnemy
	};
}

export const gameStore = createGameStore();