<script lang="ts">
	import { battleMachineState } from '$lib/stores/stateMachine/battle';
	import { turnMachineState } from '$lib/stores/stateMachine/turn';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	const endTurnStates: string[] = [
		'TurnWonState',
		'TurnTiedState',
		'TurnLostState',
		'TurnPlayerBustedState',
		'TurnEnemyBustedState'
	];

	function fight() {
		dispatch('fight');
	}

	function newTurn() {
		dispatch('newTurn');
	}
</script>

{#if $battleMachineState.currentState.name === 'BattlePlayingState'}
	{#if $turnMachineState.currentState.name === 'TurnPlayerPlayingState'}
		<button
			transition:fade={{ delay: 250, duration: 300 }}
			class="btn btn-xl variant-filled-error"
			on:click={() => fight()}
		>
			Fight
		</button>
	{/if}

	{#if endTurnStates.includes($turnMachineState.currentState.name)}
		<button
			in:fade={{ delay: 250, duration: 300 }}
			class="btn btn-xl variant-filled-warning"
			on:click={() => newTurn()}
		>
			New turn
		</button>
	{/if}
{/if}

{#if $battleMachineState.currentState.name === 'BattleWonState'}
	<div in:fade={{ delay: 250, duration: 300 }} class="variant-ghost-success p-4">
		<p class="p text-xl">You won!</p>
	</div>
{/if}

{#if $battleMachineState.currentState.name === 'BattleLostState'}
	<div in:fade={{ delay: 250, duration: 300 }} class="variant-ghost-error p-4">
		<p class="p text-xl">You lost!</p>
	</div>
{/if}
