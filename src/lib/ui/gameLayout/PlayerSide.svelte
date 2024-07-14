<script lang="ts">
	import type { Hand } from '$lib/models/hand/model';
	import Icon from '@iconify/svelte';
	import Deck from '../deck/Deck.svelte';
	import Discard from '../deck/Discard.svelte';
	import PlayingCard from '../playingCard/PlayingCard.svelte';

	export let playerName: string;
	export let currentHealth: number;
	export let maxHealth: number;
	export let playerHand: Hand;
	export let deckSize: number;
	export let discardSize: number;

	export let currentStateName: string;

	export let isEnemy: boolean = false;

	const endTurnStates: string[] = ['TurnWonState', 'TurnTiedState', 'TurnLostState', 'TurnBustedState'];
</script>

<div class="flex flex-col items-center justify-center w-5/12">
	<h3 class="h3">{playerName} {currentHealth}/{maxHealth}</h3>
	<div
		class="flex {isEnemy
			? 'flex-row-reverse'
			: 'flex-row'}  flex-wrap items-center justify-start w-full space-x-5"
	>
		<div class="flex flex-col items-center justify-center space-y-5 h-full w-2/12">
			<button on:click disabled={currentStateName !== 'TurnPlayingState'} type="button">
				<Deck {deckSize} />
			</button>

			<Discard {discardSize} />
		</div>
		<div
			class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto px-4 py-10 w-9/12"
		>
			{#each playerHand.cards as card}
				<PlayingCard {card} />
			{/each}
		</div>
		{#if endTurnStates.includes(currentStateName)}
			<div class="flex flex-row flex-wrap items-center justify-center w-full text-4xl text-red-500">
				<p class="p">{playerHand.getValue()}</p>
				<Icon icon="game-icons:battle-axe" />
			</div>
		{/if}
	</div>
</div>
