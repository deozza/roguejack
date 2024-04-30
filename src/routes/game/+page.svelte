<script lang="ts">
	import { BattleStore } from '$lib/stores/battle';
	import type { CharacterStore } from '$lib/stores/character';
	import PlayingCard from '$lib/ui/playingCard/PlayingCard.svelte';
    import type { PageData } from './$types';
	import { ProgressBar, type ModalSettings } from '@skeletonlabs/skeleton';
    import { initializeStores,getModalStore, Modal } from '@skeletonlabs/skeleton';

	export let data: PageData;

    const modalStore = getModalStore();

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
            data.player.hand = data.player.hand.addToHand(drawnCard);
        }else{
            data.player.currentLife = 0;
            const modal: ModalSettings = {
                type: 'component',
                title: 'You lose',
                body: 'There was no cards left to draw',
                component: 'modalDeckOut'
            };
            modalStore.trigger(modal);
        }
    }

    function fight() {
        const battle = new BattleStore(data.player, data.enemy);
        const damages = battle.getDamages();

        data.player.currentLife -= damages.damagesToPlayer;
        data.enemy.currentLife -= damages.damagesToEnemy;

        if(data.player.currentLife <= 0){
            const modal: ModalSettings = {
                type: 'alert',
                title: 'You lose',
                body: 'You have been defeated',
            };
            modalStore.trigger(modal);
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
