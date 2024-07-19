<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Card } from '$lib/models/card/model';
	import { fly, slide } from 'svelte/transition';

	export let card: Card;
	export let isEnemy: boolean = false;
</script>

<div
	class="inline-flex bg-white drop-shadow-2xl flex flex-col items-center justify-between rounded-xl card-hover p-2 min-h-32 min-w-24 {isEnemy ? '-ml-12' : '-mr-12'} {card.suit}"
	in:fly={{ delay: 300, duration: 800 }}
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
