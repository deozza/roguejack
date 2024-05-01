<script lang="ts">
	import { enemyCharacterHealthBarColor, enemyCharacterStore, playerCharacterHealthBarColor, playerCharacterStore } from '$lib/stores/character';
	import { enemyDeckStore, playerDeckStore } from '$lib/stores/deck';
	import { enemyHandStore, playerHandStore } from '$lib/stores/hand';
	import { gameStore } from '$lib/stores/game';
	import { battleStore } from '$lib/stores/battle';
	import { turnStore } from '$lib/stores/turn';
	import { messageBusStore } from '$lib/stores/messageBus';

	import Deck from '$lib/ui/deck/Deck.svelte';
	import PlayingCard from '$lib/ui/playingCard/PlayingCard.svelte';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';


	onMount(() => {
		messageBusStore.addEvent('init-game');
		messageBusStore.addEvent('init-battle');
		messageBusStore.addEvent('init-turn');
	});

	messageBusStore.subscribe((store) => {
		console.log('messageBusStore', store);
	});

	function draw() {
		messageBusStore.addEvent('player-draw');
	}

	function fight() {
		messageBusStore.addEvent('init-fight');
	
	}

</script>


<div class="flex flex-row flex-wrap w-full justify-between">
    <div class="flex flex-col w-1/3 items-center space-y-6">
        <div class="flex flex-row flex-wrap items-center justify-around  w-full">
            <div class="flex flex-col">
                <h3 class="h3">{$playerCharacterStore.name}</h3>
                <div class="flex flex-col w-48">
                    <h3>{$playerCharacterStore.currentLife} / {$playerCharacterStore.maxLife}</h3>
                    <ProgressBar value={$playerCharacterStore.currentLife} max={$playerCharacterStore.currentLife} meter={$playerCharacterHealthBarColor} />
                </div>
            </div>
            <Deck deckSize={$playerDeckStore.cards.length} />
        </div>

        <div class="flex flex-row justify-left items-center overflow-x-auto w-full">
            {#each $playerHandStore.cards as card}
                <PlayingCard card={card} />
            {/each}
        </div>
		{$turnStore.playerTurn.score}
    </div>
    <div class="flex flex-col justify-center">
        
        <div class="flex flex-row flex-wrap justify-center items-center w-full space-x-6">
            <button class="btn btn-xl variant-filled-success" on:click={draw}>Draw</button>
			<button class="btn btn-xl variant-filled-primary" on:click={fight}>Fight</button>
        </div>
    </div>
    <div class="flex flex-col w-1/3 items-center space-y-6">
        <div class="flex flex-row flex-wrap items-center justify-around  w-full">
            <div class="flex flex-col">
                <h3 class="h3">{$enemyCharacterStore.name}</h3>
                <div class="flex flex-col w-48">
                    <h3>{$enemyCharacterStore.currentLife} / {$enemyCharacterStore.maxLife}</h3>
                    <ProgressBar value={$enemyCharacterStore.currentLife} max={$enemyCharacterStore.maxLife} meter={$enemyCharacterHealthBarColor} />
                </div>
            </div>
            <Deck deckSize={$enemyDeckStore.cards.length} />
        </div>   
        <div class="flex flex-row justify-left items-center overflow-x-auto w-full">
            {#each $enemyHandStore.cards as card}
                <PlayingCard card={card} />
            {/each}
        </div>
		{$turnStore.enemyTurn.score}
    </div>
</div>
