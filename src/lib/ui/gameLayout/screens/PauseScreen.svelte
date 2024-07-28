<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<section
	class="absolute h-full w-full z-50 bg-surface-500/90"
>
	<div class="flex flex-col items-center justify-center h-full w-full space-y-10">
		<h1 class="h1">Pause</h1>
		<button class="btn" on:click={() => dispatch('resume')}>Resume game</button>
		<button class="btn" on:click={() => dispatch('quit')}>Quit game</button>
	</div>
</section>
