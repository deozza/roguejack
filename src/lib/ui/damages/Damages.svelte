<script lang="ts">
	import type { Hand } from '$lib/models/hand/model';
	import Icon from '@iconify/svelte';

	export let currentTurn: Hand;
	export let opponentTurn: Hand;
</script>

<div class="flex flex-row justify-center items-center w-full">
	<span class="text-4xl text-red-500">
		{#if opponentTurn.isBusted === true}
			{#if currentTurn.isBusted === true}
				<Icon icon="game-icons:broken-axe" />
				{currentTurn.value - 21}
			{/if}
		{:else if currentTurn.isBusted === true}
			<Icon icon="game-icons:broken-axe" />
			{currentTurn.value - 21}
		{:else if currentTurn.isBlackjack === true}
			<Icon icon="game-icons:magix-axe" />
			{currentTurn.value}
		{:else}
			<Icon icon="game-icons:battle-axe" />
			{currentTurn.value}
		{/if}
	</span>
</div>
