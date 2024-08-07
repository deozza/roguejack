import { describe, expect, it } from 'vitest';
import { GameMachineState } from './gameMachineState';
import type { EventInterface } from '../interfaces';

describe('game state machine test', () => {
	it('init state machine', () => {
		const gameMachineState = new GameMachineState();

		expect(gameMachineState.currentState.name).toBe('GameIdleState');
	});

	it('transition to next valid state', () => {
		const gameMachineState = new GameMachineState();

		expect(gameMachineState.currentState.name).toBe('GameIdleState');

		const event: EventInterface = {
			name: 'NEW_GAME',
			data: {}
		};

		gameMachineState.listenToEvent(event);

		expect(gameMachineState.currentState.name).toBe('GameCharacterSelectionState');
	});

	it('transition to next invalid state', () => {
		const gameMachineState = new GameMachineState();

		expect(gameMachineState.currentState.name).toBe('GameIdleState');

		const event: EventInterface = {
			name: 'INVALID_EVENT',
			data: {}
		};

		gameMachineState.listenToEvent(event);

		expect(gameMachineState.currentState.name).toBe('GameIdleState');
	});

	it('full process', () => {
		const gameMachineState = new GameMachineState();
		expect(gameMachineState.currentState.name).toBe('GameIdleState');

		let event: EventInterface = {
			name: 'NEW_GAME',
			data: {}
		};
		gameMachineState.listenToEvent(event);
		expect(gameMachineState.currentState.name).toBe('GameCharacterSelectionState');

		event = {
			name: 'CHARACTER_SELECTED',
			data: {}
		};
		gameMachineState.listenToEvent(event);
		expect(gameMachineState.currentState.name).toBe('GameInitState');

		event = {
			name: 'START_GAME',
			data: {}
		};
		gameMachineState.listenToEvent(event);
		expect(gameMachineState.currentState.name).toBe('GamePlayingState');

		event = {
			name: 'PAUSE_GAME',
			data: {}
		};
		gameMachineState.listenToEvent(event);
		expect(gameMachineState.currentState.name).toBe('GamePausedState');

		event = {
			name: 'RESUME_GAME',
			data: {}
		};
		gameMachineState.listenToEvent(event);
		expect(gameMachineState.currentState.name).toBe('GamePlayingState');

		event = {
			name: 'END_GAME',
			data: {}
		};
		gameMachineState.listenToEvent(event);
		expect(gameMachineState.currentState.name).toBe('GameLostState');
	});
});
