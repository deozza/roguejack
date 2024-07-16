<script lang="ts">
	import { TurnPlayingState } from '$lib/models/stateMachine/turn/states/turnPlayingState';
	import { battleMachineState } from '$lib/stores/stateMachine/battle';
	import { playerTurnMachineState } from '$lib/stores/stateMachine/turn';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const endTurnStates: string[] = [
		'TurnWonState',
		'TurnTiedState',
		'TurnLostState',
		'TurnBustedState'
	];

	function fight() {
		dispatch('fight');
	}

	function newTurn() {
		dispatch('newTurn');
	}
</script>

{#if $playerTurnMachineState.currentState.name === 'TurnPlayingState'}
	<button class="btn btn-xl variant-filled-error" on:click={() => fight()}> Fight </button>
{/if}

{#if endTurnStates.includes($playerTurnMachineState.currentState.name)}
	<button class="btn btn-xl variant-filled-warning" on:click={() => newTurn()}> New turn </button>
{/if}
