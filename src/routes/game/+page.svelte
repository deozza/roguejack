<script lang="ts">
	import type { CharacterStore } from '$lib/stores/character';
	import PlayingCard from '$lib/ui/playingCard/PlayingCard.svelte';
    import type { PageData } from './$types';
	import { ProgressBar } from '@skeletonlabs/skeleton';
    
	export let data: PageData;

    function getMeterColor(player: CharacterStore): string {
        if (player.currentLife > player.maxLife * 0.75) {
            return "bg-green-500";
        } else if (player.currentLife > player.maxLife * 0.5) {
            return "bg-yellow-500";
        } else if (player.currentLife > player.maxLife * 0.25) {
            return "bg-orange-500";
        } else {
            return "bg-red-500";
        }
    }

    function draw() {
        const drawnCard = data.player.deck.drawTopCard();
        if(drawnCard !== undefined){
            data.player.hand.cards = [...data.player.hand.cards, drawnCard];
        }
    }

    function fight() {
        const playerValue = 777;
        const enemyValue = data.enemy.hand.getHandValue();

        if(playerValue === enemyValue){
            return;
        }

        let damages: number = 0;
        if(playerValue === 777) {
            damages = (21 - enemyValue) * 2;
        } else if(enemyValue === 777) {
            damages = (21 - playerValue) * 2;
        } else {
            damages = playerValue - enemyValue;
        }

        if(damages > 0){
            data.enemy.currentLife -= damages;
            if(data.enemy.currentLife < 0){
                data.enemy.currentLife = 0;
            }
        } else {
            data.player.currentLife += damages;
            if(data.player.currentLife < 0){
                data.player.currentLife = 0;
            }
        }
    }

    
</script>


<h1 class="h1">BATTLE</h1>

<div class="flex flex-row flex-wrap w-full justify-between">
    <div class="flex flex-col w-1/3 items-center space-y-6">
        <h2 class="h2">{data.player.name}</h2>
        <div class="flex flex-col w-full">
            <h3>{data.player.currentLife} / {data.player.maxLife}</h3>
            <ProgressBar value={data.player.currentLife} max={data.player.maxLife} meter={getMeterColor(data.player)} />
        </div>
        <div class="flex flex-row flex-wrap justify-center">
            {#each data.player.hand.cards as card}
                <PlayingCard card={card} />
            {/each}

        </div>
    </div>
    <div class="flex flex-col justify-center">
        
        <div class="flex flex-row flex-wrap justify-center items-center w-full space-x-6">
            <button class="btn btn-xl variant-filled-success" on:click={draw}>Draw</button>
            <button class="btn btn-xl variant-filled-primary" on:click={fight}>Fight !</button>
        </div>
    </div>
    <div class="flex flex-col w-1/3 items-center space-y-6">
        <h2 class="h2">{data.enemy.name}</h2>
        <div class="flex flex-col w-full">
            <h3>{data.enemy.currentLife} / {data.enemy.maxLife}</h3>
            <ProgressBar value={data.enemy.currentLife} max={data.enemy.maxLife} meter={getMeterColor(data.enemy)} />
        </div>        
        <div class="flex flex-row flex-wrap justify-center">
            {#each data.enemy.hand.cards as card}
                <PlayingCard card={card} />
            {/each}
        </div>
    </div>
</div>
