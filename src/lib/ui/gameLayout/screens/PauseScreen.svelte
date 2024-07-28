<script>
	import { gameMachineState } from '$lib/stores/stateMachine/game';
	import { createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';

	const dispatch = createEventDispatcher();
</script>

<section class="absolute h-full w-full z-50 bg-surface-500/90">
	<div class="flex flex-col items-center justify-center h-full w-full space-y-10">
		<h1 class="h1">Pause</h1>

		{#if $page.url.pathname === '/help'}
			<a class="btn" href="/" on:click={() => dispatch('resume')}>Back to game</a>
		{:else}
			<button class="btn" on:click={() => dispatch('resume')}>Resume game</button>

			<a class="btn" href="/help" on:click={() => dispatch('resume')}>Help</a>
		{/if}

		{#if $gameMachineState.currentState.name !== 'GameIdleState'}
			<button class="btn" on:click={() => dispatch('quit')}>Quit game</button>
		{/if}
	</div>
</section>
