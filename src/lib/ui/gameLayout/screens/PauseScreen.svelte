<script>
	import { gameMachineState } from "$lib/stores/stateMachine/game";
import { createEventDispatcher } from "svelte";


	import { fade } from "svelte/transition";
	const dispatch = createEventDispatcher();

</script>

<section
	class="absolute h-full w-full z-50 bg-surface-500/90"
	transition:fade={{ delay: 250, duration: 300 }}
>
	<div class="flex flex-col items-center justify-center h-full w-full">
		<h1 class="h1">Pause</h1>
		<button class="btn" on:click={() => dispatch('resume')}>Resume game</button>
		
		{#if $gameMachineState.currentState.name !== 'GameIdleState'}
			<button class="btn" on:click={() => dispatch('quit')}>Quit game</button>
		{/if}
	</div>
</section>
