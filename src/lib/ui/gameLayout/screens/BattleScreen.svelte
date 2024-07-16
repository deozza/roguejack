<script lang="ts">
	import { gameStore } from '$lib/stores/game';
	import PlayerSide from '../battleScreen/PlayerSide.svelte';
	import { playerTurnMachineState } from '$lib/stores/stateMachine/turn';
	import { enemyTurnMachineState } from '$lib/stores/stateMachine/turn';
	import { battleMachineState } from '$lib/stores/stateMachine/battle';
	import { gameMachineState } from '$lib/stores/stateMachine/game';
	import { TurnDeckEmptyState } from '$lib/models/stateMachine/turn/states/turnDeckEmptyState';
	import CenterSide from '../battleScreen/CenterSide.svelte';
	import { TurnPlayingState } from '$lib/models/stateMachine/turn/states/turnPlayingState';
	import { playerSideEffectsStore } from '$lib/stores/sideEffects';
	import { fade } from 'svelte/transition';

	function drawCard() {
		$playerTurnMachineState.listenToEvent({ name: 'DRAW', data: null });
		$playerTurnMachineState = $playerTurnMachineState;

		try {
			$playerTurnMachineState.currentState.onStateExecute({ user: 'player' });
		} catch (e: any) {
			if (e.message === 'PLAYER_EMPTY_DECK') {
				$playerTurnMachineState.listenToEvent({ name: 'DECK_EMPTY', data: null });
				$playerTurnMachineState = $playerTurnMachineState;

				updateBattleState();
			}
		}

		if ($gameStore.getCurrentBattle()?.getCurrentTurn().playerHand.getIsBusted() === true) {
			$playerTurnMachineState.listenToEvent({ name: 'BUST', data: null });
			$playerTurnMachineState = $playerTurnMachineState;

			calculateAndApplyDamages();

			return;
		}

		$playerTurnMachineState.listenToEvent({ name: 'PLAY', data: null });
		$playerTurnMachineState = $playerTurnMachineState;
	}

	function fight() {
		$playerTurnMachineState.listenToEvent({ name: 'FIGHT', data: null });
		$playerTurnMachineState = $playerTurnMachineState;

		$enemyTurnMachineState.listenToEvent({ name: 'DRAW', data: null });
		$enemyTurnMachineState = $enemyTurnMachineState;

		try {
			$enemyTurnMachineState.currentState.onStateExecute({ user: 'enemy' });
		} catch (e: any) {
			if (e.message === 'ENEMY_EMPTY_DECK') {
				$enemyTurnMachineState.listenToEvent({ name: 'DECK_EMPTY', data: null });
				$enemyTurnMachineState = $enemyTurnMachineState;

				$playerTurnMachineState.listenToEvent({ name: 'WIN', data: null });
				$playerTurnMachineState = $playerTurnMachineState;

				calculateAndApplyDamages();
			}

			return;
		}

		if ($gameStore.getCurrentBattle()?.getCurrentTurn().enemyHand.getIsBusted() === true) {
			$enemyTurnMachineState.listenToEvent({ name: 'BUST', data: null });
			$enemyTurnMachineState = $enemyTurnMachineState;

			calculateAndApplyDamages();

			return;
		}

		$enemyTurnMachineState.listenToEvent({ name: 'PLAY', data: null });
		$enemyTurnMachineState = $enemyTurnMachineState;

		$enemyTurnMachineState.listenToEvent({ name: 'FIGHT', data: null });
		$enemyTurnMachineState = $enemyTurnMachineState;

		calculateAndApplyDamages();
	}

	function calculateAndApplyDamages() {
		$playerTurnMachineState.listenToEvent({ name: 'DAMAGE', data: null });
		$playerTurnMachineState = $playerTurnMachineState;
		$playerTurnMachineState.currentState.onStateEnter({ user: 'player' });
		$playerTurnMachineState.currentState.onStateExecute({});

		$enemyTurnMachineState.listenToEvent({ name: 'DAMAGE', data: null });
		$enemyTurnMachineState = $enemyTurnMachineState;

		if ($gameStore.getCurrentBattle()?.getCurrentTurn().fight.playerHasWon === true) {
			$playerTurnMachineState.listenToEvent({ name: 'WIN', data: null });
			$playerTurnMachineState = $playerTurnMachineState;

			$enemyTurnMachineState.listenToEvent({ name: 'LOSE', data: null });
			$enemyTurnMachineState = $enemyTurnMachineState;
		}

		if ($gameStore.getCurrentBattle()?.getCurrentTurn().fight.enemyHasWon === true) {
			$playerTurnMachineState.listenToEvent({ name: 'LOSE', data: null });
			$playerTurnMachineState = $playerTurnMachineState;

			$enemyTurnMachineState.listenToEvent({ name: 'WIN', data: null });
			$enemyTurnMachineState = $enemyTurnMachineState;
		}

		if (
			$gameStore.getCurrentBattle()?.getCurrentTurn().fight.playerHasWon ===
			$gameStore.getCurrentBattle()?.getCurrentTurn().fight.enemyHasWon
		) {
			$playerTurnMachineState.listenToEvent({ name: 'TIE', data: null });
			$playerTurnMachineState = $playerTurnMachineState;

			$enemyTurnMachineState.listenToEvent({ name: 'TIE', data: null });
			$enemyTurnMachineState = $enemyTurnMachineState;
		}

		gameStore.inflictDamagesToEnemy(
			$gameStore.getCurrentBattle()?.getCurrentTurn().fight.baseDamageToEnemy *
				$gameStore.getCurrentBattle()?.getCurrentTurn().fight.multiplierForPlayer
		);
		gameStore.inflictDamagesToPlayer(
			$gameStore.getCurrentBattle()?.getCurrentTurn().fight.baseDamageToPlayer *
				$gameStore.getCurrentBattle()?.getCurrentTurn().fight.multiplierForEnemy
		);

		updateBattleState();
	}

	function newTurn() {
		gameStore.endTurn();
		$playerTurnMachineState.listenToEvent({ name: 'NEW_TURN', data: null });
		$playerTurnMachineState = $playerTurnMachineState;
		$playerTurnMachineState.currentState.onStateExecute({ user: 'player' });

		$playerTurnMachineState.listenToEvent({ name: 'PLAY', data: null });
		$playerTurnMachineState = $playerTurnMachineState;
		$playerTurnMachineState.currentState.onStateExecute({ user: 'player' });

		enemyTurnMachineState.update((state) => {
			state.currentState = new TurnPlayingState();
			return state;
		});
	}

	function updateBattleState() {
		if ($enemyTurnMachineState.currentState.name === TurnDeckEmptyState.name) {
			$playerTurnMachineState.listenToEvent({ name: 'WIN', data: null });
			$playerTurnMachineState = $playerTurnMachineState;

			$battleMachineState.listenToEvent({ name: 'WIN', data: null });
			$battleMachineState = $battleMachineState;

			redirectToCampOrShop();

			return;
		}

		if ($playerTurnMachineState.currentState.name === TurnDeckEmptyState.name) {
			$playerTurnMachineState.listenToEvent({ name: 'LOSE', data: null });
			$playerTurnMachineState = $playerTurnMachineState;

			$battleMachineState.listenToEvent({ name: 'LOSE', data: null });
			$battleMachineState = $battleMachineState;

			return;
		}

		if ($gameStore.getCurrentBattle()?.enemy.currentHealth <= 0) {
			$battleMachineState.listenToEvent({ name: 'WIN', data: null });
			$battleMachineState = $battleMachineState;

			redirectToCampOrShop();

			return;
		}

		if ($gameStore.player.currentHealth <= 0) {
			$battleMachineState.listenToEvent({ name: 'LOSE', data: null });
			$battleMachineState = $battleMachineState;

			$gameMachineState.listenToEvent({ name: 'END_GAME', data: null });
			$gameMachineState = $gameMachineState;

			return;
		}
	}

	function redirectToCampOrShop() {
		gameStore.endTurn();
		if ($gameStore.battles.length % 5 === 0) {
			$battleMachineState.listenToEvent({ name: 'SHOP', data: null });
			$battleMachineState = $battleMachineState;
		} else {
			$battleMachineState.listenToEvent({ name: 'CAMP', data: null });
			$battleMachineState = $battleMachineState;
		}
	}
</script>

<section
	class="container h-full mx-auto flex flex-col justify-left items-start space-y-10"
	id="battle-screen"
	transition:fade={{ delay: 250, duration: 300 }}
>
<div class="flex md:hidden flex-col items-center justify-center w-full md:mb-20">
	<h1 class="h1">Battle {$gameStore?.battles.length}</h1>
	<h2 class="h2">Turn {$gameStore?.getCurrentBattle()?.turns.length}</h2>
</div>
	<div class="flex flex-row flex-wrap items-center justify-between h-full w-full">
		
		<PlayerSide
			playerName={$gameStore.player.name}
			currentHealth={$gameStore.player.currentHealth}
			maxHealth={$gameStore.player.maxHealth}
			healthColor={$gameStore.player.getHealthColor()}
			playerHand={$gameStore.getCurrentBattle().getCurrentTurn().playerHand}
			deckSize={$gameStore.player.deck.cards.length}
			discardSize={$gameStore.player.discard.cards.length}
			currentStateName={$playerTurnMachineState.currentState.name}
			fight={$gameStore.getCurrentBattle().getCurrentTurn().fight}
			sideEffects={$playerSideEffectsStore}
			on:click={() => drawCard()}
		/>

		<div class="flex flex-col items-center justify-center md:h-full w-full md:w-2/12">
			<div class="hidden md:flex flex-col items-center justify-center w-full md:mb-20">
				<h1 class="h1">Battle {$gameStore?.battles.length}</h1>
				<h2 class="h2">Turn {$gameStore?.getCurrentBattle()?.turns.length}</h2>
			</div>

			<CenterSide
				on:fight={() => fight()}
				on:camp={() => redirectToCampOrShop()}
				on:newTurn={() => newTurn()}
			/>
		</div>

		<PlayerSide
			playerName={$gameStore.getCurrentBattle().enemy.name}
			currentHealth={$gameStore.getCurrentBattle().enemy.currentHealth}
			maxHealth={$gameStore.getCurrentBattle().enemy.maxHealth}
			healthColor={$gameStore.getCurrentBattle().enemy.getHealthColor()}
			playerHand={$gameStore.getCurrentBattle().getCurrentTurn().enemyHand}
			deckSize={$gameStore.getCurrentBattle().enemy.deck.cards.length}
			discardSize={$gameStore.getCurrentBattle().enemy.discard.cards.length}
			currentStateName={$enemyTurnMachineState.currentState.name}
			fight={$gameStore.getCurrentBattle().getCurrentTurn().fight}
			sideEffects={[]}
			isEnemy={true}
		/>
	</div>
</section>
