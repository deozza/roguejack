<script lang="ts">
	import type { Card } from '$lib/models/card/model';
	import type { Discard } from '$lib/models/discard/model';
	import PlayingCard from '$lib/ui/playingCard/PlayingCard.svelte';

	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	export let cards: Card[];
	export let isPlayer: boolean = false;

	const dispatch = createEventDispatcher();
</script>

<section
	class="absolute w-full z-10 bg-surface-500/90 drop-shadow-2xl"
	transition:fade={{ delay: 250, duration: 300 }}
>
	<div class="flex flex-col items-center justify-center h-full w-full">
		<div class="flex flex-row items-center justify-end w-full p-4">
			<button class="btn" on:click={() => dispatch('close')}>
				<Icon icon="mdi:close" width="24" height="24" />
			</button>	
		</div>

		<div class="flex flex-row items-center justify-center w-full p-4">
			<h1 class="h1">
				Discard preview
			</h1>
		</div>
		<div
			class="inline-flex w-10/12 h-full flex-row flex-wrap items-start justify-center overscroll-none overflow-y-scroll pb-24"
		>
			{#each cards as card}
				<PlayingCard {card} />
			{/each}
		</div>
	</div>
</section>
