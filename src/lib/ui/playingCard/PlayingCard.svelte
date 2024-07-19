<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Card } from '$lib/models/card/model';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	export let card: Card;
	export let delay: number = 500;
	export let duration: number = 1000;
</script>

<div
	class="bg-white flex flex-col items-center justify-between rounded-xl card-hover p-2 min-h-32 min-w-24 m-1 {card.suit}"
>
	<div class="flex flex-row items-center self-start">
		<span class="font-semibold">{card.face} </span>
		<Icon icon={'bi:suit-' + card.suit + '-fill'} />
	</div>
	<span class="h1 font-semibold">{card.face} </span>
	<div class="flex flex-row items-center self-end backward">
		<Icon icon={'bi:suit-' + card.suit + '-fill'} />
		<span class="font-semibold">{card.face} </span>
	</div>
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
