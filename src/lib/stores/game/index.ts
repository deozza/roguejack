import { get, writable } from 'svelte/store';
import { stackedFMSStore } from '../stackedFMS';

export const createGameStore = () => {
	const { subscribe, update } = writable({
		state: 'idle'
	});

	return {
		subscribe,
		update
	};
};

export const gameStore = createGameStore();

stackedFMSStore.subscribe((states) => {
	const currentState = states[states.length - 1];

	if (currentState === undefined) {
		return;
	}

	if (currentState.name === 'game.init') {
		if (get(gameStore).state === 'init') {
			stackedFMSStore.transitionToState({
				id: '',
				name: 'battle.init',
				from: [],
				to: [],
				data: null
			});

			return;
		}

		gameStore.update(() => ({
			state: 'init'
		}));

		stackedFMSStore.pushNewState({
			id: '',
			name: 'character.player.create',
			from: [],
			to: [],
			data: null
		});
	}
});
