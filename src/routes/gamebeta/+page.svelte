<script lang="ts">
	
	import {playerDeckStore} from '$lib/stores/deck';
	import {playerHandStore} from '$lib/stores/hand';
	import Deck from '$lib/ui/deck/Deck.svelte';
	import PlayingCard from '$lib/ui/playingCard/PlayingCard.svelte';


	playerDeckStore.generateDeck();
	playerDeckStore.shuffleDeck();

	function draw() {
		const card = playerDeckStore.drawTopCard($playerDeckStore);
		if(card) {
			playerHandStore.addToHand(card);
		}
	}

</script>

<Deck deckSize={$playerDeckStore.cards.length} />

<div class="flex flex-row justify-left items-center overflow-x-auto w-full">
	{#each $playerHandStore.cards as card}
		<PlayingCard card={card} />
	{/each}
</div>

<button class="btn btn-xl variant-filled-success" on:click={draw}>Draw</button>
