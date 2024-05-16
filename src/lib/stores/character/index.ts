import { get, writable, type Writable } from 'svelte/store';

export type Character = {
	name: string;
	level: number;
	maxHealth: number;
	currentHealth: number;
};

export const createCharacterStore = () => {
	const store: Writable<Character> = writable<Character>({
		name: '',
		level: 1,
		maxHealth: 10,
		currentHealth: 10
	});

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
		takeDamage,
		heal,
		getHealthColor,
		getCharacter
	};
};
