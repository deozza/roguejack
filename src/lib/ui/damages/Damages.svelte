<script lang="ts">
	import type { HandStore } from '$lib/stores/hand';
	import type { CharacterTurn, Turn } from '$lib/stores/turn';

	export let currentTurn: CharacterTurn;
	export let opponentTurn: CharacterTurn;
</script>

<div class="flex flex-row justify-center items-center w-full">
	<span class="text-4xl text-red-500">
		{#if opponentTurn.isBusted === true}
			{#if currentTurn.isBusted === true}
				<iconify-icon icon="game-icons:broken-axe"></iconify-icon>
				{currentTurn.score - 21}
			{/if}
		{:else if currentTurn.isBusted === true}
			<iconify-icon icon="game-icons:broken-axe"></iconify-icon>
			{currentTurn.score - 21}
		{:else if currentTurn.isBlackJack === true}
			<iconify-icon icon="game-icons:magic-axe"></iconify-icon>
			{currentTurn.score}
		{:else}
			<iconify-icon icon="game-icons:battle-axe"></iconify-icon>
			{currentTurn.score}
		{/if}
	</span>
</div>
