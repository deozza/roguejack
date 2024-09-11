<script lang="ts">
	import type Card from '$lib/modeles/Card';
	import Icon from '@iconify/svelte';
	import { fly } from 'svelte/transition';

    export let card: Card;
	export let isEnemy: boolean = false;

	function getFlyOutDirection() {
		if(isEnemy) {
			return { delay: 100, duration: 700, x: 120, y: 150 };
		}
		
		return { delay: 100, duration: 700, x: -120, y: 150 };
	}

	function getFlyInDirection() {
		if(isEnemy) {
			return { delay: 100, duration: 700, x: 120, y: -10 };
		}
		
		return { delay: 100, duration: 700, x: -120, y: -10 };
	}
</script>


<div
    class="inline-flex bg-white drop-shadow-2xl flex flex-col items-center justify-between rounded-xl card-hover p-2 min-h-32 min-w-24 
        {isEnemy
		? '-ml-12'
		: '-mr-12'} {card.suit}"
		in:fly={getFlyInDirection()}
		out:fly={getFlyOutDirection()}
>
    <div class="flex flex-row items-center self-start">
        <span class="font-semibold">{card.value} </span>
        <Icon icon={'bi:suit-' + card.suit + '-fill'} />
    </div>
    <span class="h1 font-semibold">{card.value} </span>
    <div class="flex flex-row items-center self-end">
        <Icon icon={'bi:suit-' + card.suit + '-fill'} />
        <span class="font-semibold">{card.value} </span>
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