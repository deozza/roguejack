<script lang="ts">
	import type { CardStore } from '$lib/stores/card';
	import { EnemyStore, type CharacterStore } from '$lib/stores/character';
	import PlayingCard from '$lib/ui/playingCard/PlayingCard.svelte';
    import type { PageData } from './$types';
	import { ProgressBar, type ModalSettings } from '@skeletonlabs/skeleton';
    import { getModalStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
    import "iconify-icon";
	import Deck from '$lib/ui/deck/Deck.svelte';
	import { fade } from 'svelte/transition';
	import Damages from '$lib/ui/damages/Damages.svelte';

	export let data: PageData;
    let card: CardStore|undefined;
    let endOfTurn: boolean = false;
    let damageMessage: string = "";
    let endOfBattle: boolean = false; 

    const modalStore = getModalStore();

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
        endOfBattle = false;
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
        damageMessage = data.battle.getDamagesMessage(damages);

        data.battle.player.currentLife = Math.max(data.battle.player.currentLife - damages.damagesToPlayer, 0);
        data.battle.enemy.currentLife = Math.max(data.battle.enemy.currentLife - damages.damagesToEnemy, 0);

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
            endOfBattle = true;
            return;
        }

        data.battle.battleState = 'reloading';
        endOfTurn = true;
    }

    function initNewTurn() {
        damageMessage = "";
        data.battle.player.putHandIntoDiscard();
        data.battle.enemy.putHandIntoDiscard();
        data.battle.turnNumber = data.battle.turnNumber+1;
        endOfTurn = false;
        initBattle();
    }
</script>

<h1 class="h1">BATTLE {data.battle.battleNumber}</h1>
<div class="flex flex-row items-center">
    <h2 class="h2 items-center">
        Turn {data.battle.turnNumber}
    </h2>
</div>

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
            <Deck deckSize={data.battle.player.deck.getDeckSize()} />
        </div>

        <div class="flex flex-row justify-left items-center overflow-x-auto w-full">
            {#each data.battle.player.hand.cards as card}
                <PlayingCard card={card} />
            {/each}
        </div>
        {#if data.battle.battleState !== 'playing'}
            <Damages currentHand={data.battle.player.hand} opponentHand={data.battle.enemy.hand}/>
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
            <Deck deckSize={data.battle.enemy.deck.getDeckSize()} />
        </div>   
        <div class="flex flex-row justify-left items-center overflow-x-auto w-full">
            {#each data.battle.enemy.hand.cards as card}
                <PlayingCard card={card} />
            {/each}
        </div>
        {#if data.battle.battleState !== 'playing'}
            <Damages currentHand={data.battle.enemy.hand} opponentHand={data.battle.player.hand}/>
        {/if}
    </div>
</div>

{#if endOfTurn === true}
    <div class="flex flex-row justify-between items-center bg-primary-900 rounded-md p-6 w-1/3" transition:fade>
        <p class="text-xl font-semibold">
            {damageMessage}
        </p>
        <button class="btn btn-md variant-filled-surface" on:click={initNewTurn}>New turn !</button>
    </div>
{/if}

{#if endOfBattle === true}
    <div class="flex flex-col justify-between items-center bg-success-500 rounded-md p-6 min-w-1/3 space-y-3" transition:fade>
        <p class="text-xl text-black font-semibold">
            {damageMessage}
        </p>
        <p class="text-xl text-black font-semibold">
            You won this battle !
        </p>
        <button class="btn btn-md variant-filled-surface" on:click={initNewBattle}>New battle !</button>
    </div>
{/if}

