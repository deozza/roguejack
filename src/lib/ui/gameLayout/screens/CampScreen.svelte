<script lang="ts">
	import { TurnPlayingState } from "$lib/models/stateMachine/turn/states/turnPlayingState";
	import { gameStore } from "$lib/stores/game";
	import { battleMachineState } from "$lib/stores/stateMachine/battle";
	import { enemyTurnMachineState, playerTurnMachineState } from "$lib/stores/stateMachine/turn";
	import Deck from "$lib/ui/deck/Deck.svelte";
	import Discard from "$lib/ui/deck/Discard.svelte";

    function healAtCamp() {
        gameStore.healPercentages(10, 'player');
        startNewBattle();
    }

    function recycleAtCamp() {
        gameStore.recycleDiscard(4, 'player');

        startNewBattle();
    }

    function startNewBattle() {
        $battleMachineState.listenToEvent({ name: 'NEW_BATTLE', data: null });
		$battleMachineState = $battleMachineState;
		$battleMachineState.currentState.onStateExecute({});

        $battleMachineState.listenToEvent({ name: 'PLAY', data: null });
		$battleMachineState = $battleMachineState;

		$playerTurnMachineState.listenToEvent({ name: 'NEW_TURN', data: null });
		$playerTurnMachineState = $playerTurnMachineState;
		$playerTurnMachineState.currentState.onStateExecute({'user': 'player'});

		$playerTurnMachineState.listenToEvent({ name: 'PLAY', data: null });
		$playerTurnMachineState = $playerTurnMachineState;
		$playerTurnMachineState.currentState.onStateExecute({'user': 'player'});

		enemyTurnMachineState.update((state) => {state.currentState = new TurnPlayingState(); return state;})
    }

</script>

<section class="container h-full mx-auto flex flex-col justify-left items-start space-y-10" id="camp-screen">
    <div class="flex flex-col items-center justify-center h-full w-full">
        <h1 class="h1">Camp</h1>
        <div class="flex flex-row flex-wrap items-center justify-around w-full">
            <div class="flex flex-col items-center justify-center w-4/12">
                <h2 class="h2">Status</h2>
                <div class="flex flex-col items-center justify-center">
                    <p class="p">Health: {$gameStore.player.currentHealth}/{$gameStore.player.maxHealth}</p>
                    <Deck deckSize={$gameStore.player.deck.cards.length} />
                    <Discard discardSize={$gameStore.player.discard.cards.length} />
                </div>
            </div>
            <div class="flex flex-row flex-wrap items-center justify-start w-7/12">
                <button class="btn btn-xl variant-ghost-success" on:click={() => healAtCamp()}
                    >Heal</button
                >
                <button class="btn btn-xl variant-ghost-secondary" on:click={() => recycleAtCamp()}
                    >Recycle discard</button
                >
            </div>
        </div>
    </div>
</section>