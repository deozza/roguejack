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
	class="bg-white flex flex-col items-center justify-between rounded-xl card-hover p-4 min-h-32 min-w-24 m-1 {card.suit}"
>
	<div class="text-start w-full">
		<Icon icon={'bi:suit-' + card.suit + '-fill'} />
	</div>
	<span class="h1 font-semibold">{card.face} </span>
	<div class="text-end w-full">
		<Icon icon={'bi:suit-' + card.suit + '-fill'} class="backward" />
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

	.backward {
		transform: rotate(180deg);
	}
</style>
