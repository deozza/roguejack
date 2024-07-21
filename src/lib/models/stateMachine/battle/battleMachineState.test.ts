import { describe, expect, it } from 'vitest';
import type { EventInterface } from '../interfaces';
import { BattleMachineState } from './battleMachineState';

describe('battle state machine test', () => {
	it('init state machine', () => {
		const battleMachineState = new BattleMachineState();
		expect(battleMachineState.currentState.name).toBe('BattleIdleState');
	});

	it('transition to next valid state', () => {
		const battleMachineState = new BattleMachineState();
		expect(battleMachineState.currentState.name).toBe('BattleIdleState');

		const event: EventInterface = {
			name: 'NEW_BATTLE',
			data: {}
		};

		battleMachineState.listenToEvent(event);
		expect(battleMachineState.currentState.name).toBe('BattleInitState');
	});

	it('transition to next invalid state', () => {
		const battleMachineState = new BattleMachineState();
		expect(battleMachineState.currentState.name).toBe('BattleIdleState');

		const event: EventInterface = {
			name: 'INVALID_EVENT',
			data: {}
		};

		battleMachineState.listenToEvent(event);
		expect(battleMachineState.currentState.name).toBe('BattleIdleState');
	});

	it('full process - win variation', () => {
		const battleMachineState = new BattleMachineState();
		expect(battleMachineState.currentState.name).toBe('BattleIdleState');

		let event: EventInterface = {
			name: 'NEW_BATTLE',
			data: {}
		};
		battleMachineState.listenToEvent(event);
		expect(battleMachineState.currentState.name).toBe('BattleInitState');

		event = {
			name: 'PLAY',
			data: {}
		};
		battleMachineState.listenToEvent(event);
		expect(battleMachineState.currentState.name).toBe('BattlePlayingState');

		event = {
			name: 'WIN',
			data: {}
		};
		battleMachineState.listenToEvent(event);
		expect(battleMachineState.currentState.name).toBe('BattleWonState');

		event = {
			name: 'CAMP',
			data: {}
		};
		battleMachineState.listenToEvent(event);
		expect(battleMachineState.currentState.name).toBe('BattleCampingState');

		event = {
			name: 'SHOP',
			data: {}
		};
		battleMachineState.listenToEvent(event);
		expect(battleMachineState.currentState.name).toBe('BattleShopingState');

		event = {
			name: 'RESET',
			data: {}
		};
		battleMachineState.listenToEvent(event);
		expect(battleMachineState.currentState.name).toBe('BattleIdleState');
	});
});
