<script lang="ts">
	import { battleMachineState } from '$lib/stores/stateMachine/battle';
	import { turnMachineState } from '$lib/stores/stateMachine/turn';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	function fight() {
		dispatch('fight');
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
{/if}
