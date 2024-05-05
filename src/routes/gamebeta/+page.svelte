<script lang="ts">
	import { enemyCharacterHealthBarColor, enemyCharacterStore, playerCharacterHealthBarColor, playerCharacterStore } from '$lib/stores/character';
	import { enemyDeckStore, playerDeckStore } from '$lib/stores/deck';
	import { enemyHandStore, playerHandStore } from '$lib/stores/hand';
	import { turnStore } from '$lib/stores/turn';
	import { messageBusStore } from '$lib/stores/messageBus';

	import Deck from '$lib/ui/deck/Deck.svelte';
	import PlayingCard from '$lib/ui/playingCard/PlayingCard.svelte';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { stackedFMSStore } from '$lib/stores/stackedFMS';
	import Damages from '$lib/ui/damages/Damages.svelte';
	import { fade } from 'svelte/transition';


    let loading = true;
    let turnResume: object | null = null;

    onMount(() => {
        stackedFMSStore.subscribe((states) => {
            const currentState = states[states.length - 1];
            if(currentState.name === 'turn.playing') {
                loading = false;
                turnResume = null;
            }

            if(currentState.name === 'turn.end') {
                turnResume = currentState.data;
            }
        })
    });

	function draw() {
		stackedFMSStore.pushNewState({
            id: '',
            name: 'turn.player.draw',
            from: [],
            to: [],
            data: null
        });
	}

	function fight() {
        stackedFMSStore.transitionToState({
            id: '',
            name: 'turn.fight',
            from: [],
            to: [],
            data: null
        });
	}

    function startNextTurn() {
        stackedFMSStore.transitionToState({
            id: '',
            name: 'turn.start',
            from: [],
            to: [],
            data: null
        });
    }

</script>

{#if loading}
    <div class="flex flex-col items-center justify-center w-full h-full">
        <h1 class="h1">Loading...</h1>
    </div>

{:else}


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
        {#if turnResume !== null}
            <Damages currentTurn={turnResume.turn.playerTurn} opponentTurn={turnResume.turn.enemyTurn}/>
        {/if}
    </div>
    <div class="flex flex-col justify-center">
        
        <div class="flex flex-row flex-wrap justify-center items-center w-full space-x-6">
            <button class="btn btn-xl variant-filled-success" on:click={()=>draw()} disabled={turnResume !== null}>Draw</button>
			<button class="btn btn-xl variant-filled-primary" on:click={()=>fight()} disabled={turnResume !== null}>Fight</button>
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
        {#if turnResume !== null}
            <Damages currentTurn={turnResume.turn.enemyTurn} opponentTurn={turnResume.turn.playerTurn}/>
        {/if}
    </div>
</div>
{/if}

{#if turnResume !== null}
    <div class="flex flex-row justify-between items-center bg-primary-900 rounded-md p-6 w-1/3" transition:fade>
        <p class="text-xl font-semibold">
            {turnResume.damageMessage}
        </p>
        <button class="btn btn-md variant-filled-surface" on:click={() => startNextTurn()}>New turn !</button>
    </div>
{/if}