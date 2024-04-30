import type { CardStore } from '$lib/stores/card';
import { CharacterStore } from '$lib/stores/character';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	let card: CardStore|undefined;
	const player: CharacterStore = new CharacterStore()
	player.name = 'Player';
	player.maxLife = 20;
	player.currentLife = 20;
	player.deck.createDeck();
	player.deck.shuffleDeck();
	card = player.deck.drawTopCard();
	if(card !== undefined) {
		player.hand.addToHand(card);
	}
	card = player.deck.drawTopCard();
	if(card !== undefined) {
		player.hand.addToHand(card);
	}
	
	const enemy: CharacterStore = new CharacterStore()
	enemy.name = 'Enemy';
	enemy.maxLife = 5;
	enemy.currentLife = 5;
	enemy.deck.createDeck();
	enemy.deck.shuffleDeck();
	card = enemy.deck.drawTopCard();
	if(card !== undefined) {
		enemy.hand.addToHand(card);
	}
	return {
		player: player,
		enemy: enemy
	};
};