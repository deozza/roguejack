<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import type { Card } from '$lib/models/card/model';
	import { BattleIdleState } from '$lib/models/stateMachine/battle/states';
	import { GamePlayingState } from '$lib/models/stateMachine/game/states';
	import { TurnPlayingState } from '$lib/models/stateMachine/turn/states/turnPlayingState';
	import { TurnMachineState } from '$lib/models/stateMachine/turn/turnMachineState';
	import { battleMachineState } from '$lib/stores/battle';
	import { gameStore, gameMachineState } from '$lib/stores/game';
	import { playerTurnMachineState, enemyTurnMachineState } from '$lib/stores/turn';
	import BattleResultAlert from '$lib/ui/gameLayout/BattleResultAlert.svelte';
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

			$gameStore.player.takeDamage(
				$gameStore.getCurrentBattle().getCurrentTurn().playerHand.getValue() - 21
			);
			$gameStore = $gameStore;

			return;
		}

		$playerTurnMachineState.listenToEvent({ name: 'PLAY', data: null });
		$playerTurnMachineState = $playerTurnMachineState;
	}

	function fight() {
		$playerTurnMachineState.listenToEvent({ name: 'FIGHT', data: null });
		$enemyTurnMachineState.currentState = new TurnPlayingState();
		$enemyTurnMachineState = $enemyTurnMachineState;

		while ($gameStore?.getCurrentBattle()?.getCurrentTurn().enemyHand.getValue() < 16) {
			enemyAutoDraw();
		}
		$enemyTurnMachineState.listenToEvent({ name: 'FIGHT', data: null });
		$enemyTurnMachineState = $enemyTurnMachineState;

		if ($enemyTurnMachineState.currentState.constructor.name === 'TurnBustedState') {
			$playerTurnMachineState.listenToEvent({ name: 'WIN', data: null });
			$playerTurnMachineState = $playerTurnMachineState;

			$battleMachineState.listenToEvent({ name: 'WIN', data: null });
			$battleMachineState = $battleMachineState;

			$gameStore
				?.getCurrentBattle()
				?.enemy.takeDamage(
					$gameStore.getCurrentBattle().getCurrentTurn().enemyHand.getValue() - 21
				);
			$gameStore = $gameStore;

			return;
		}

		if (
			$gameStore?.getCurrentBattle()?.getCurrentTurn().playerHand.getValue() ===
			$gameStore?.getCurrentBattle()?.getCurrentTurn().enemyHand.getValue()
		) {
			$playerTurnMachineState.listenToEvent({ name: 'TIE', data: null });
			$playerTurnMachineState = $playerTurnMachineState;

			$enemyTurnMachineState.listenToEvent({ name: 'TIE', data: null });
			$enemyTurnMachineState = $enemyTurnMachineState;
		}

		if (
			$gameStore?.getCurrentBattle()?.getCurrentTurn().playerHand.getValue() >
			$gameStore?.getCurrentBattle()?.getCurrentTurn().enemyHand.getValue()
		) {
			$playerTurnMachineState.listenToEvent({ name: 'WIN', data: null });
			$playerTurnMachineState = $playerTurnMachineState;

			$enemyTurnMachineState.listenToEvent({ name: 'LOSE', data: null });
			$enemyTurnMachineState = $enemyTurnMachineState;

			let damage: number =
				$gameStore.getCurrentBattle().getCurrentTurn().playerHand.getValue() -
				$gameStore.getCurrentBattle().getCurrentTurn().enemyHand.getValue();
			if ($gameStore?.getCurrentBattle()?.getCurrentTurn().playerHand.getIsBlackjack() === true) {
				damage = damage * 2;
			}

			$gameStore?.getCurrentBattle()?.enemy.takeDamage(damage);
			$gameStore = $gameStore;
		}

		if (
			$gameStore?.getCurrentBattle()?.getCurrentTurn().playerHand.getValue() <
			$gameStore?.getCurrentBattle()?.getCurrentTurn().enemyHand.getValue()
		) {
			$playerTurnMachineState.listenToEvent({ name: 'LOSE', data: null });
			$playerTurnMachineState = $playerTurnMachineState;

			$enemyTurnMachineState.listenToEvent({ name: 'WIN', data: null });
			$enemyTurnMachineState = $enemyTurnMachineState;

			let damage: number =
				$gameStore.getCurrentBattle().getCurrentTurn().enemyHand.getValue() -
				$gameStore.getCurrentBattle().getCurrentTurn().playerHand.getValue();
			if ($gameStore?.getCurrentBattle()?.getCurrentTurn().enemyHand.getIsBlackjack() === true) {
				damage = damage * 2;
			}

			$gameStore?.player.takeDamage(damage);
			$gameStore = $gameStore;
		}

		if ($gameStore?.player.currentHealth <= 0) {
			$battleMachineState.listenToEvent({ name: 'LOSE', data: null });
			$battleMachineState = $battleMachineState;

			$gameMachineState.listenToEvent({ name: 'END_GAME', data: null });
			$gameMachineState = $gameMachineState;

			return;
		}

		if ($gameStore?.getCurrentBattle()?.enemy.currentHealth <= 0) {
			$battleMachineState.listenToEvent({ name: 'WIN', data: null });
			$battleMachineState = $battleMachineState;
			return;
		}
	}

	function enemyAutoDraw() {
		$enemyTurnMachineState.listenToEvent({ name: 'DRAW', data: null });
		$enemyTurnMachineState = $enemyTurnMachineState;

		const card: Card | null | undefined = $gameStore?.getCurrentBattle()?.enemy.deck.drawTopCard();
		if (card === null || card === undefined) {
			$enemyTurnMachineState.listenToEvent({ name: 'DECK_EMPTY', data: null });
			$enemyTurnMachineState = $enemyTurnMachineState;

			$battleMachineState.listenToEvent({ name: 'WIN', data: null });
			$battleMachineState = $battleMachineState;

			$playerTurnMachineState.listenToEvent({ name: 'WIN', data: null });
			$playerTurnMachineState = $playerTurnMachineState;

			return;
		}

		$gameStore?.getCurrentBattle()?.getCurrentTurn().enemyHand.addCard(card);
		$gameStore = $gameStore;

		if ($gameStore?.getCurrentBattle()?.getCurrentTurn().enemyHand.getIsBusted() === true) {
			$enemyTurnMachineState.listenToEvent({ name: 'BUST', data: null });
			$enemyTurnMachineState = $enemyTurnMachineState;

			return;
		}

		$enemyTurnMachineState.listenToEvent({ name: 'PLAY', data: null });
		$enemyTurnMachineState = $enemyTurnMachineState;
	}

	function prepareForNewTurn() {
		$gameStore
			?.getCurrentBattle()
			?.getCurrentTurn()
			.playerHand.cards.forEach((card) => {
				$gameStore?.player.discard.discardCard(card);
			});
		$gameStore?.getCurrentBattle()?.getCurrentTurn().playerHand.clearHand();

		$gameStore
			?.getCurrentBattle()
			?.getCurrentTurn()
			.enemyHand.cards.forEach((card) => {
				$gameStore?.getCurrentBattle()?.enemy.discard.discardCard(card);
			});
		$gameStore?.getCurrentBattle()?.getCurrentTurn().enemyHand.clearHand();

		$gameStore = $gameStore;

		playerTurnMachineState.set(new TurnMachineState());
		enemyTurnMachineState.set(new TurnMachineState());
		startTurn();
	}

	function prepareForNewBattle() {
		$gameStore
			?.getCurrentBattle()
			?.getCurrentTurn()
			.playerHand.cards.forEach((card) => {
				$gameStore?.player.discard.discardCard(card);
			});
		$gameStore?.getCurrentBattle()?.getCurrentTurn().playerHand.clearHand();

		$gameStore = $gameStore;

		playerTurnMachineState.set(new TurnMachineState());
		enemyTurnMachineState.set(new TurnMachineState());

		startBattle();
	}
</script>

<div class="container h-full mx-auto flex flex-col justify-left items-start space-y-10">
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
				playerHand={$gameStore.getCurrentBattle().getCurrentTurn().playerHand}
				deckSize={$gameStore.player.deck.cards.length}
				discardSize={$gameStore.player.discard.cards.length}
				currentStateName={$playerTurnMachineState.currentState.constructor.name}
				on:click={() => drawCard()}
			/>

			<div class="flex flex-col items-center justify-center w-full md:w-2/12">
				<button
					class="btn btn-xl variant-filled-error"
					on:click={() => fight()}
					disabled={$playerTurnMachineState.currentState.constructor.name !== 'TurnPlayingState'}
				>
					Fight
				</button>
			</div>

			<PlayerSide
				playerName={$gameStore?.getCurrentBattle().enemy.name}
				currentHealth={$gameStore?.getCurrentBattle().enemy.currentHealth}
				maxHealth={$gameStore?.getCurrentBattle().enemy.maxHealth}
				playerHand={$gameStore.getCurrentBattle().getCurrentTurn().enemyHand}
				deckSize={$gameStore?.getCurrentBattle().enemy.deck.cards.length}
				discardSize={$gameStore?.getCurrentBattle().enemy.discard.cards.length}
				currentStateName={$enemyTurnMachineState.currentState.constructor.name}
				isEnemy={true}
			/>
		</div>
	{/if}

	<div class="flex flex-col items-center justify-center w-full">
		<BattleResultAlert
			battleResult={$battleMachineState.currentState.constructor.name}
			on:click={() => prepareForNewBattle()}
		/>
	</div>

	{#if $battleMachineState.currentState.constructor.name === 'BattlePlayingState'}
		<div class="flex flex-col items-center justify-center w-full">
			<TurnResultAlert
				turnResult={$playerTurnMachineState.currentState.constructor.name}
				on:click={() => prepareForNewTurn()}
			/>
		</div>
	{/if}

	{#if $gameMachineState.currentState.constructor.name === 'GameLostState'}
		<div class="flex flex-col items-center justify-center w-full">
			<div
				class="flex flex-row flex-wrap items-center justify-between w-full md:w-1/2 variant-ghost-error p-6 rounded"
			>
				<p class="p">You lost this game</p>
				<a on:click class="btn variant-filled-surface rounded-md" href="/"> New game </a>
			</div>
		</div>
	{/if}
</div>
