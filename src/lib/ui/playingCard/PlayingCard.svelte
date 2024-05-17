<script lang="ts">
	import type { Card } from '$lib/stores/card/model';
	import 'iconify-icon';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	export let card: Card;
</script>

<div
	class="bg-white flex flex-col items-center justify-between rounded-xl card-hover p-4 min-h-48 min-w-36 m-1 {card.suit}"
	transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'x' }}
>
	<div class="text-start w-full">
		<iconify-icon icon={'bi:suit-' + card.suit + '-fill'} />
	</div>
	<span class="h1 font-semibold">{card.face} </span>
	<div class="text-end w-full">
		<iconify-icon icon={'bi:suit-' + card.suit + '-fill'} class="backward" />
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
