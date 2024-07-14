<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import type { Card } from '$lib/models/card/model';
	import { BattleIdleState } from '$lib/models/stateMachine/battle/states';
	import { GamePlayingState } from '$lib/models/stateMachine/game/states';
	import { TurnMachineState } from '$lib/models/stateMachine/turn/turnMachineState';
	import { battleMachineState } from '$lib/stores/battle';
	import { gameStore, gameMachineState } from '$lib/stores/game';
	import { playerTurnMachineState, enemyTurnMachineState } from '$lib/stores/turn';
	import PlayerSide from '$lib/ui/gameLayout/PlayerSide.svelte';
	import TurnResultAlert from '$lib/ui/gameLayout/TurnResultAlert.svelte';

	afterNavigate((to) => {
		if ($gameMachineState.currentState.constructor.name !== GamePlayingState.name) {
			//
		}

		if (
			$gameStore?.getCurrentBattle() === null &&
			$battleMachineState.currentState.constructor.name === BattleIdleState.name
		) {
			startBattle();
		}
	});

	function startBattle() {
		$battleMachineState.listenToEvent({ name: 'NEW_BATTLE', data: null });
		$battleMachineState.currentState.onStateExecute({ game: $gameStore });
		$battleMachineState = $battleMachineState;

		$battleMachineState.listenToEvent({ name: 'PLAY', data: null });
		$battleMachineState = $battleMachineState;
		startTurn();
	}

	function startTurn() {
		$playerTurnMachineState.listenToEvent({ name: 'NEW_TURN', data: null });
		$playerTurnMachineState.currentState.onStateExecute({ game: $gameStore });
		$playerTurnMachineState = $playerTurnMachineState;

		$playerTurnMachineState.listenToEvent({ name: 'PLAY', data: null });
		$playerTurnMachineState = $playerTurnMachineState;
	}

	function drawCard() {
		$playerTurnMachineState.listenToEvent({ name: 'DRAW', data: null });
		$playerTurnMachineState = $playerTurnMachineState;

		if ($playerTurnMachineState.currentState.constructor.name !== 'TurnDrawingState') {
			return;
		}

		const card: Card | null | undefined = $gameStore?.player.deck.drawTopCard();
		if (card === null || card === undefined) {
			$playerTurnMachineState.listenToEvent({ name: 'DECK_EMPTY', data: null });
			$playerTurnMachineState = $playerTurnMachineState;

			$battleMachineState.listenToEvent({ name: 'LOSE', data: null });
			$battleMachineState = $battleMachineState;

			$gameMachineState.listenToEvent({ name: 'END_GAME', data: null });
			$gameMachineState = $gameMachineState;

			return;
		}

		$gameStore?.getCurrentBattle()?.getCurrentTurn().playerHand.addCard(card);
		$gameStore = $gameStore;

		if ($gameStore?.getCurrentBattle()?.getCurrentTurn().playerHand.getIsBusted() === true) {
			$playerTurnMachineState.listenToEvent({ name: 'BUST', data: null });
			$playerTurnMachineState = $playerTurnMachineState;

			return;
		}

		$playerTurnMachineState.listenToEvent({ name: 'PLAY', data: null });
		$playerTurnMachineState = $playerTurnMachineState;
	}

	function fight() {}

    function prepareForNewTurn() {

        $gameStore?.getCurrentBattle()?.getCurrentTurn().playerHand.cards.forEach(card => {
            $gameStore?.player.discard.discardCard(card);
        });
        $gameStore?.getCurrentBattle()?.getCurrentTurn().playerHand.clearHand();

        $gameStore?.getCurrentBattle()?.getCurrentTurn().enemyHand.cards.forEach(card => {
            $gameStore?.getCurrentBattle()?.enemy.discard.discardCard(card);
        });
        $gameStore?.getCurrentBattle()?.getCurrentTurn().enemyHand.clearHand();

        $gameStore = $gameStore;

        playerTurnMachineState.set(new TurnMachineState());

        startTurn();
    }

	$: console.log('current game state', $gameMachineState.currentState.constructor.name);
	$: console.log('current battle state', $battleMachineState.currentState.constructor.name);
	$: console.log(
		'current player turn state',
		$playerTurnMachineState.currentState.constructor.name
	);
	$: console.log('game', $gameStore);
	$: console.log('current turn', $gameStore?.getCurrentBattle()?.getCurrentTurn());
</script>

<div class="container h-full mx-auto flex flex-col justify-left items-start">
	<div class="flex flex-col items-center justify-center w-full">
		<h1 class="h1">Battle {$gameStore?.battles.length}</h1>
	</div>

	<div class="flex flex-col items-center justify-center w-full">
		<h2 class="h2">Turn {$gameStore?.getCurrentBattle()?.turns.length}</h2>
	</div>

	{#if $playerTurnMachineState.currentState.constructor.name !== 'TurnIdleState'}
		<div class="flex flex-row flex-wrap items-center justify-between w-full">
			<PlayerSide
				playerName={$gameStore.player.name}
				currentHealth={$gameStore.player.currentHealth}
				maxHealth={$gameStore.player.maxHealth}
				playerHand={$gameStore.getCurrentBattle().getCurrentTurn().playerHand.cards}
				deckSize={$gameStore.player.deck.cards.length}
				discardSize={$gameStore.player.discard.cards.length}
				currentStateName={$playerTurnMachineState.currentState.constructor.name}
				on:click={() => drawCard()}
			/>

			<div class="flex flex-col items-center justify-center w-2/12">
				<button class="btn btn-xl variant-filled-error" on:click={() => fight()}> Fight </button>
			</div>

			<PlayerSide
				playerName={$gameStore?.getCurrentBattle().enemy.name}
				currentHealth={$gameStore?.getCurrentBattle().enemy.currentHealth}
				maxHealth={$gameStore?.getCurrentBattle().enemy.maxHealth}
				playerHand={$gameStore.getCurrentBattle().getCurrentTurn().enemyHand.cards}
				deckSize={$gameStore?.getCurrentBattle().enemy.deck.cards.length}
				discardSize={$gameStore?.getCurrentBattle().enemy.discard.cards.length}
				currentStateName={$enemyTurnMachineState.currentState.constructor.name}
				isEnemy={true}
			/>
		</div>
	{/if}
	<div class="flex flex-col items-center justify-center w-full">
		<TurnResultAlert turnResult={$playerTurnMachineState.currentState.constructor.name} on:click={() => prepareForNewTurn()} />
	</div>
</div>
