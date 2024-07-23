import { describe, expect, it } from 'vitest';
import type { EventInterface } from '../interfaces';
import { TurnMachineState } from './turnMachineState';

describe('turn state machine test', () => {
	it('init state machine', () => {
		const turnMachineState = new TurnMachineState();

		expect(turnMachineState.currentState.name).toBe('TurnIdleState');
	});

	it('transition to next valid state', () => {
		const turnMachineState = new TurnMachineState();

		expect(turnMachineState.currentState.name).toBe('TurnIdleState');

		const event: EventInterface = {
			name: 'NEW_TURN',
			data: {}
		};

		turnMachineState.listenToEvent(event);

		expect(turnMachineState.currentState.name).toBe('TurnPlayerInitState');
	});

	it('transition to next invalid state', () => {
		const turnMachineState = new TurnMachineState();

		expect(turnMachineState.currentState.name).toBe('TurnIdleState');

		const event: EventInterface = {
			name: 'INVALID_EVENT',
			data: {}
		};

		turnMachineState.listenToEvent(event);

		expect(turnMachineState.currentState.name).toBe('TurnIdleState');
	});

	it('full process', () => {
		const turnMachineState = new TurnMachineState();
		expect(turnMachineState.currentState.name).toBe('TurnIdleState');

		let event: EventInterface = {
			name: 'NEW_TURN',
			data: {}
		};
		turnMachineState.listenToEvent(event);
		expect(turnMachineState.currentState.name).toBe('TurnPlayerInitState');

		event = {
			name: 'PLAY',
			data: {}
		};
		turnMachineState.listenToEvent(event);
		expect(turnMachineState.currentState.name).toBe('TurnPlayerPlayingState');

		event = {
			name: 'DRAW',
			data: {}
		};
		turnMachineState.listenToEvent(event);
		expect(turnMachineState.currentState.name).toBe('TurnPlayerDrawingState');

		event = {
			name: 'PLAY',
			data: {}
		};
		turnMachineState.listenToEvent(event);
		expect(turnMachineState.currentState.name).toBe('TurnPlayerPlayingState');

		event = {
			name: 'USE_ITEM',
			data: {}
		};
		turnMachineState.listenToEvent(event);
		expect(turnMachineState.currentState.name).toBe('TurnPlayerUsingItemState');

		event = {
			name: 'PLAY',
			data: {}
		};
		turnMachineState.listenToEvent(event);
		expect(turnMachineState.currentState.name).toBe('TurnPlayerPlayingState');

		event = {
			name: 'FIGHT',
			data: {}
		};
		turnMachineState.listenToEvent(event);
		expect(turnMachineState.currentState.name).toBe('TurnEnemyInitState');

		event = {
			name: 'PLAY',
			data: {}
		};
		turnMachineState.listenToEvent(event);
		expect(turnMachineState.currentState.name).toBe('TurnEnemyPlayingState');

		event = {
			name: 'DRAW',
			data: {}
		};
		turnMachineState.listenToEvent(event);
		expect(turnMachineState.currentState.name).toBe('TurnEnemyDrawingState');

		event = {
			name: 'PLAY',
			data: {}
		};
		turnMachineState.listenToEvent(event);
		expect(turnMachineState.currentState.name).toBe('TurnEnemyPlayingState');
		
		event = {
			name: 'USE_ITEM',
			data: {}
		};
		turnMachineState.listenToEvent(event);
		expect(turnMachineState.currentState.name).toBe('TurnEnemyUsingItemState');

		event = {
			name: 'PLAY',
			data: {}
		};
		turnMachineState.listenToEvent(event);
		expect(turnMachineState.currentState.name).toBe('TurnEnemyPlayingState');
		
		event = {
			name: 'FIGHT',
			data: {}
		};
		turnMachineState.listenToEvent(event);
		expect(turnMachineState.currentState.name).toBe('TurnFightingState');
		
		event = {
			name: 'DAMAGE',
			data: {}
		};
		turnMachineState.listenToEvent(event);
		expect(turnMachineState.currentState.name).toBe('TurnDamageState');

		event = {
			name: 'WIN',
			data: {}
		};
		turnMachineState.listenToEvent(event);
		expect(turnMachineState.currentState.name).toBe('TurnWonState');
		
	});
});
