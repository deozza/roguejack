<script lang="ts">
	import type { CardStore } from '$lib/stores/card';
	import { EnemyStore, type CharacterStore } from '$lib/stores/character';
	import PlayingCard from '$lib/ui/playingCard/PlayingCard.svelte';
    import type { PageData } from './$types';
	import { ProgressBar, getToastStore, type ModalSettings, type ToastSettings } from '@skeletonlabs/skeleton';
    import { getModalStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
    import "iconify-icon";

	export let data: PageData;
    let card: CardStore|undefined;
    let loadingCount: number = 5;
    let loaderInterval : NodeJS.Timeout | null = null;

    const modalStore = getModalStore();
    const toastStore = getToastStore();

    onMount(() => {
        if(data.battle.battleState !== 'started') {
            return;
        }

        initBattle();
    });

    function initNewBattle(){
        data.battle.player.putHandIntoDiscard();

        const enemy: EnemyStore = new EnemyStore()
		enemy.name = 'Enemy ' + data.battle.battleNumber;
		enemy.maxLife = 5;
		enemy.currentLife = 5;
		enemy.deck.createDeck();
		enemy.deck.shuffleDeck();
        data.battle.enemy = enemy;

        initBattle();

        data.battle.battleNumber = data.battle.battleNumber + 1;
        data.battle.turnNumber = 1;
    }

    function initBattle() {
        draw();
        draw();
        
        card = data.battle.enemy.deck.drawTopCard();
        if(card !== undefined) {
            data.battle.enemy.hand.addToHand(card);
        }

        data.battle.battleState = 'playing';
    }

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
        const drawnCard = data.battle.player.deck.drawTopCard();

        if(drawnCard !== undefined){
            data.battle.player.hand = data.battle.player.hand.addToHand(drawnCard);
        }else{
            data.battle.player.currentLife = 0;
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
        data.battle.battleState = 'fighting';
        try{
            data.battle.enemy = data.battle.enemy.drawUntilMinimumScore();
        }catch(e){
            data.battle.enemy.currentLife = 0;
            return;
        }
        const damages = data.battle.getDamages();

        data.battle.player.currentLife -= damages.damagesToPlayer;
        data.battle.enemy.currentLife -= damages.damagesToEnemy;

        if(data.battle.player.currentLife <= 0){
            const modal: ModalSettings = {
                type: 'component',
                title: 'You lose',
                body: 'There was no cards left to draw',
                component: 'modalDied'
            };
            modalStore.trigger(modal);
            return;
        }

        if(data.battle.enemy.currentLife <= 0){
            const t: ToastSettings = {
                message: 'You won this battle !',
                autohide: false,
                action: {
                    label: 'Next battle',
                    response: () => initNewBattle()
                }
            };
            toastStore.trigger(t);
            return;
        }

        data.battle.battleState = 'reloading';

        loaderInterval = setInterval(() => {
            initNewTurn();
        }, 1000);
    }

    function initNewTurn() {
        loadingCount = loadingCount - 1;
        if(loadingCount === 0 && loaderInterval !== null) {

            data.battle.player.putHandIntoDiscard();
            data.battle.enemy.putHandIntoDiscard();
            data.battle.turnNumber = data.battle.turnNumber+1;
            initBattle();
            loadingCount = 5;
            clearInterval(loaderInterval)
        }
    }
</script>

<h1 class="h1">BATTLE {data.battle.battleNumber}</h1>
<h2 class="h2">
    Turn {data.battle.turnNumber}
    {#if data.battle.battleState === 'reloading'}    
        <span class="h4">
            New turn in {loadingCount}
            <iconify-icon icon="line-md:loading-loop"></iconify-icon>
        </span>
    {/if}
</h2>

<div class="flex flex-row flex-wrap w-full justify-between">
    <div class="flex flex-col w-1/3 items-center space-y-6">
        <div class="flex flex-row flex-wrap items-center justify-around  w-full">
            <div class="flex flex-col">
                <h3 class="h3">{data.battle.player.name}</h3>
                <div class="flex flex-col w-48">
                    <h3>{data.battle.player.currentLife} / {data.battle.player.maxLife}</h3>
                    <ProgressBar value={data.battle.player.currentLife} max={data.battle.player.maxLife} meter={getMeterColor(data.battle.player)} />
                </div>
            </div>
            <div class="flex flex-col items-center justify-center rounded-xl card-hover p-2 bg-gradient-to-br from-primary-900 to-tertiary-900 h-32 w-24">
                <span class="h4 font-semibold">
                    {data.battle.player.deck.getDeckSize()} / 52
                </span>
            </div>
        </div>

        <div class="flex flex-row justify-left items-center overflow-x-auto w-full">
            {#each data.battle.player.hand.cards as card}
                <PlayingCard card={card} />
            {/each}
        </div>
        {#if data.battle.battleState === 'reloading'}
            <div class="flex flex-row justify-center items-center w-full">
                <span class="text-4xl text-red-500">
                    {#if data.battle.player.hand.isBusted === false}
                        <iconify-icon icon="game-icons:battle-axe"></iconify-icon>                    
                        {data.battle.player.hand.score}
                    {:else}
                        <iconify-icon icon="game-icons:broken-axe"></iconify-icon>                    
                        {data.battle.player.hand.score - 21}
                    {/if}
                </span>
            </div>
        {/if}
    </div>
    <div class="flex flex-col justify-center">
        
        <div class="flex flex-row flex-wrap justify-center items-center w-full space-x-6">
            <button class="btn btn-xl variant-filled-success" on:click={draw} disabled={data.battle.battleState !== 'playing'}>Draw</button>
            <button class="btn btn-xl variant-filled-primary" on:click={fight} disabled={data.battle.battleState !== 'playing'}>Fight !</button>
        </div>
    </div>
    <div class="flex flex-col w-1/3 items-center space-y-6">
        <div class="flex flex-row flex-wrap items-center justify-around  w-full">
            <div class="flex flex-col">
                <h3 class="h3">{data.battle.enemy.name}</h3>
                <div class="flex flex-col w-48">
                    <h3>{data.battle.enemy.currentLife} / {data.battle.enemy.maxLife}</h3>
                    <ProgressBar value={data.battle.enemy.currentLife} max={data.battle.enemy.maxLife} meter={getMeterColor(data.battle.enemy)} />
                </div>
            </div>
            <div class="flex flex-col items-center justify-center rounded-xl card-hover p-2 bg-gradient-to-br from-primary-900 to-tertiary-900 h-32 w-24">
                <span class="h4 font-semibold">
                    {data.battle.enemy.deck.getDeckSize()} / 52
                </span>
            </div>
        </div>   
        <div class="flex flex-row justify-left items-center overflow-x-auto w-full">
            {#each data.battle.enemy.hand.cards as card}
                <PlayingCard card={card} />
            {/each}
        </div>
        {#if data.battle.battleState === 'reloading'}
            <div class="flex flex-row justify-center items-center w-full">
                <span class="text-4xl text-red-500">
                    {#if data.battle.enemy.hand.isBusted === false}
                        <iconify-icon icon="game-icons:battle-axe"></iconify-icon>
                        {data.battle.enemy.hand.score}
                    {:else}
                        <iconify-icon icon="game-icons:broken-axe"></iconify-icon>
                        {data.battle.enemy.hand.score - 21}
                    {/if}
                </span>
            </div>
        {/if}
    </div>
</div>
