<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Card } from '$lib/models/card/model';
	import { fly } from 'svelte/transition';

	export let card: Card;
	export let isEnemy: boolean = false;
	export let hidden: boolean = false;

	$: shouldBeHidden = (): boolean => {
		if (hidden === false) {
			return false;
		}

		return Math.random() > 0.25;
	};
</script>

<div
	class="inline-flex bg-white drop-shadow-2xl flex flex-col items-center justify-between rounded-xl card-hover p-2 min-h-32 min-w-24 {isEnemy
		? '-ml-12'
		: '-mr-12'} {card.suit}"
	class:bg-white={card.suit !== 'grim-reaper'}
	class:bg-black={card.suit === 'grim-reaper'}
	in:fly={{ delay: 300, duration: 800 }}
>
	{#if card.suit === 'grim-reaper'}
		<div class="flex flex-row items-center self-start backward diamond">
			<Icon icon={'game-icons:grim-reaper'} />
		</div>
		<Icon icon={'game-icons:grim-reaper'} height="64" width="64" />
		<div class="flex flex-row items-center self-end backward diamond">
			<Icon icon={'game-icons:grim-reaper'} />
		</div>
	{:else if shouldBeHidden()}
		<div class="flex flex-row items-center self-start">
			<span class="font-semibold">? </span>
		</div>
		<span class="h1 font-semibold">? </span>
		<div class="flex flex-row items-center self-end">
			<span class="font-semibold">? </span>
		</div>
	{:else}
		<div class="flex flex-row items-center self-start">
			<span class="font-semibold">{card.face} </span>
			<Icon icon={'bi:suit-' + card.suit + '-fill'} />
		</div>
		<span class="h1 font-semibold">{card.face} </span>
		<div class="flex flex-row items-center self-end">
			<Icon icon={'bi:suit-' + card.suit + '-fill'} />
			<span class="font-semibold">{card.face} </span>
		</div>
	{/if}
</div>

<style>
	.spade,
	.club {
		color: black;
	}

	.heart,
	.diamond {
		color: red;
	}

	:global(.backward) {
		transform: rotate(180deg);
	}
</style>
