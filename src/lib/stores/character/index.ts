import { get, writable, type Writable } from 'svelte/store';
import type { Deck } from '../deck';
import type { Discard } from '../discard';

export type Character = {
	name: string;
	level: number;
	maxHealth: number;
	currentHealth: number;
	deck: Deck;
	discard: Discard;
};

const createCharacterStore = () => {
	const store: Writable<Character> = writable<Character>({
		name: '',
		level: 1,
		maxHealth: 10,
		currentHealth: 10,
		deck: {
			cards: []
		},
		discard: {
			cards: []
		}
	});

	function generateCharacter() {
		store.update((state) => {
			state.name = 'Player';
			state.level = 1;
			state.maxHealth = 10;
			state.currentHealth = 10;
			state.deck = {
				cards: []
			};
			state.discard = {
				cards: []
			};
			return state;
		});
	}

	function takeDamage(damage: number) {
		store.update((state) => {
			state.currentHealth = Math.max(state.currentHealth - damage, 0);
			return state;
		});
	}

	function heal(heal: number) {
		store.update((state) => {
			state.currentHealth = Math.min(state.currentHealth + heal, state.maxHealth);
			return state;
		});
	}

	function getHealthColor(): string {
		if (getCharacter().currentHealth / getCharacter().maxHealth > 0.75) {
			return 'bg-green-500';
		}

		if (getCharacter().currentHealth / getCharacter().maxHealth > 0.5) {
			return 'bg-yellow-500';
		}

		if (getCharacter().currentHealth / getCharacter().maxHealth > 0.25) {
			return 'bg-orange-500';
		}

		return 'bg-red-500';
	}

	function getCharacter() {
		return get(store);
	}

	return {
		generateCharacter,
		takeDamage,
		heal,
		getHealthColor,
		getCharacter
	};
};

export const characterStore = createCharacterStore();