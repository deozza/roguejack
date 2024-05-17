<script lang="ts">
	import type { Hand } from '$lib/stores/hand/model';

	export let currentTurn: Hand;
	export let opponentTurn: Hand;
</script>

<div class="flex flex-row justify-center items-center w-full">
	<span class="text-4xl text-red-500">
		{#if opponentTurn.isBusted === true}
			{#if currentTurn.isBusted === true}
				<iconify-icon icon="game-icons:broken-axe"></iconify-icon>
				{currentTurn.value - 21}
			{/if}
		{:else if currentTurn.isBusted === true}
			<iconify-icon icon="game-icons:broken-axe"></iconify-icon>
			{currentTurn.value - 21}
		{:else if currentTurn.isBlackjack === true}
			<iconify-icon icon="game-icons:magic-axe"></iconify-icon>
			{currentTurn.value}
		{:else}
			<iconify-icon icon="game-icons:battle-axe"></iconify-icon>
			{currentTurn.value}
		{/if}
	</span>
</div>
