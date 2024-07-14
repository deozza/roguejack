<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { BattleIdleState } from '$lib/models/stateMachine/battle/states';
	import { GamePlayingState } from '$lib/models/stateMachine/game/states';
	import { battleMachineState } from '$lib/stores/battle';
    import { gameStore, gameMachineState } from '$lib/stores/game';
    import { playerTurnMachineState } from '$lib/stores/turn';
	import Deck from '$lib/ui/deck/Deck.svelte';
	import PlayingCard from '$lib/ui/playingCard/PlayingCard.svelte';


    afterNavigate((to) => {
        if($gameMachineState.currentState.constructor.name !== GamePlayingState.name) {
            //
        }

        if($gameStore?.getCurrentBattle() === null && $battleMachineState.currentState.constructor.name === BattleIdleState.name) {
            startBattle();
        }
    });

    function startBattle() {
        $battleMachineState.listenToEvent({name: 'NEW_BATTLE', data: null});
        $battleMachineState.currentState.onStateExecute({game: $gameStore});
        $battleMachineState = $battleMachineState;

        $battleMachineState.listenToEvent({name: 'PLAY', data: null});
        $battleMachineState = $battleMachineState;
        startTurn();
    }

    function startTurn() {
        console.log('starting turn');
        $playerTurnMachineState.listenToEvent({name: 'NEW_TURN', data: null});
        $playerTurnMachineState.currentState.onStateExecute({game: $gameStore});
        $playerTurnMachineState = $playerTurnMachineState;

        $playerTurnMachineState.listenToEvent({name: 'PLAY', data: null});
        $playerTurnMachineState = $playerTurnMachineState;
    }

    function drawCard() {

    }

    function fight() {

    }

$: console.log('current game state', $gameMachineState.currentState.constructor.name);
$: console.log('current battle state', $battleMachineState.currentState.constructor.name);
$: console.log('current player turn state', $playerTurnMachineState.currentState.constructor.name);
$: console.log('game', $gameStore);
$: console.log('current turn', $gameStore?.getCurrentBattle()?.getCurrentTurn());

</script>

<div class="flex flex-col items-center justify-center w-full">
    <h1 class="h1">Battle {$gameStore?.battles.length}</h1>
</div>

<div class="flex flex-col items-center justify-center w-full">
    <h2 class="h2">Turn {$gameStore?.getCurrentBattle()?.turns.length}</h2>
</div>

{#if $playerTurnMachineState.currentState.constructor.name === 'TurnPlayingState'}

<div class="flex flex-row flex-wrap items-center justify-between w-full">
    <div class="flex flex-col items-center justify-center w-5/12">
        <h3 class="h3">{$gameStore?.player.name} {$gameStore?.player.currentHealth}/{$gameStore?.player.maxHealth}</h3>
        <div class="flex flex-row flex-wrap items-center justify-start">
            <Deck deckSize={$gameStore?.player.deck.cards.length} />
            {#each $gameStore?.getCurrentBattle()?.getCurrentTurn().playerHand.cards as card}
                <PlayingCard {card} />
            {/each}
        </div>
    </div>

    <div class="flex flex-col items-center justify-center w-2/12">
        <button class="btn btn-xl variant-filled-success" on:click={() => drawCard()}> Draw card </button>
        <button class="btn btn-xl variant-filled-error" on:click={() => fight()}> Fight </button>
    </div>

    <div class="flex flex-col items-center justify-center w-5/12">
        <h3 class="h3">{$gameStore?.getCurrentBattle().enemy.name} {$gameStore?.getCurrentBattle().enemy.currentHealth}/{$gameStore?.getCurrentBattle().enemy.maxHealth}</h3>
        <div class="flex flex-row flex-wrap items-center justify-start">
            <Deck deckSize={$gameStore?.getCurrentBattle().enemy.deck.cards.length} />
            {#each $gameStore?.getCurrentBattle()?.getCurrentTurn().enemyHand.cards as card}
                <PlayingCard {card} />
            {/each}
        </div>
    </div>
</div>

{/if}
