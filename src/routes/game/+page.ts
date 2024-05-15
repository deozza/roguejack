import { battleStore, BattleStore } from '$lib/stores/battle';
import { CharacterStore, EnemyStore } from '$lib/stores/character';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	let battle: BattleStore	| null = null;
	battleStore.subscribe((b)=>{battle = b});

	if(battle === null) {
		const player: CharacterStore = new CharacterStore();
		player.name = 'Player';
		player.maxLife = 20;
		player.currentLife = 20;
		player.deck.createDeck();
		player.deck.shuffleDeck();

		const enemy: EnemyStore = new EnemyStore()
		enemy.name = 'Enemy';
		enemy.maxLife = 5;
		enemy.currentLife = 5;
		enemy.deck.createDeck();
		enemy.deck.shuffleDeck();

		battle = new BattleStore(player, enemy);
	}

	return {
		battle: battle,
	};
};

// import { CharacterStore } from '$lib/stores/character';
// import { GameStore, gameStore } from '$lib/stores/game';
// import type { PageLoad } from './$types';

// export const load: PageLoad = async () => {
// 	let game: GameStore	| null = null;
// 	gameStore.subscribe((g)=>{game = g});

// 	if(game === null) {
// 		game = new GameStore(new CharacterStore);
// 		game.initGame();
// 	}

// 	return {
// 		game: game,
// 	};
// };