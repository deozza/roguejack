import { writable, get, derived } from 'svelte/store';
import { stackedFMSStore } from '../stackedFMS';

type Character = {
	currentLife: number;
	maxLife: number;
	name: string;
};

export const createCharacterStore = () => {
	const { update, subscribe } = writable<Character>({
		currentLife: 0,
		maxLife: 0,
		name: ''
	});

	function generateStandardPlayer() {
		update(() => ({
			currentLife: 20,
			maxLife: 20,
			name: 'Player'
		}));
	}

	function generateStandardEnemy() {
		update(() => ({
			currentLife: 5,
			maxLife: 5,
			name: 'Enemy'
		}));
	}

	function dealDamage(newLife: number) {
		update((store) => ({
			...store,
			currentLife: Math.max(store.currentLife - newLife, 0)
		}));
	}
	return {
		subscribe,
		generateStandardEnemy,
		generateStandardPlayer,
		dealDamage,
		get
	};
};

export const playerCharacterStore = createCharacterStore();
export const playerCharacterHealthBarColor = derived(
	playerCharacterStore,
	($playerCharacterStore) => {
		return getCharacterHealthBarColor($playerCharacterStore);
	}
);

export const enemyCharacterStore = createCharacterStore();
export const enemyCharacterHealthBarColor = derived(enemyCharacterStore, ($enemyCharacterStore) => {
	return getCharacterHealthBarColor($enemyCharacterStore);
});

function getCharacterHealthBarColor(character: Character): string {
	if (character.currentLife > character.maxLife * 0.75) {
		return 'bg-green-500';
	}

	if (character.currentLife > character.maxLife * 0.5) {
		return 'bg-yellow-500';
	}

	if (character.currentLife > character.maxLife * 0.25) {
		return 'bg-orange-500';
	}
	return 'bg-red-500';
}

stackedFMSStore.subscribe((states) => {
	const currentState = states[states.length - 1];

	if (currentState === undefined) {
		return;
	}

	if (currentState.name === 'character.player.create') {
		playerCharacterStore.generateStandardPlayer();
		stackedFMSStore.transitionToState({
			id: '',
			name: 'deck.player.create',
			from: [],
			to: [],
			data: null
		});
	}

	if (currentState.name === 'character.enemy.create') {
		enemyCharacterStore.generateStandardEnemy();
		stackedFMSStore.transitionToState({
			id: '',
			name: 'deck.enemy.create',
			from: [],
			to: [],
			data: null
		});
	}
});
