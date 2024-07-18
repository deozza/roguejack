<script lang="ts">
	import { gameStore } from '$lib/stores/game';
	import PlayerSide from '../battleScreen/PlayerSide.svelte';
	import { playerTurnMachineState } from '$lib/stores/stateMachine/turn';
	import { enemyTurnMachineState } from '$lib/stores/stateMachine/turn';
	import { battleMachineState } from '$lib/stores/stateMachine/battle';
	import { gameMachineState } from '$lib/stores/stateMachine/game';
	import CenterSide from '../battleScreen/CenterSide.svelte';
	import { TurnPlayingState } from '$lib/models/stateMachine/turn/states/turnPlayingState';
	import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
	import { fade } from 'svelte/transition';
	import DiscardPreview from '../battleScreen/DiscardPreview.svelte';
	import { delay, scrollToElement } from '$lib/utils';
	import BattlePower from '../battleScreen/BattlePower.svelte';

	let openedEnemyDiscardView: boolean = false;
	let openedPlayerDiscardView: boolean = false;

	function triggerEffect(effect: any) {
		effect.effect({ user: 'player' });

		gameStore.removeFromInventory(effect, 'player');

		updateBattleState();
	}

	async function drawCard() {
		$playerTurnMachineState.listenToEvent({ name: 'DRAW', data: null });
		$playerTurnMachineState = $playerTurnMachineState;

		try {
			await $playerTurnMachineState.currentState.onStateExecute({ user: 'player' });
			$playerTurnMachineState.currentState.onStateExit({ user: 'player' });
		} catch (e: any) {
			if (e.message === 'PLAYER_EMPTY_DECK') {
				$playerTurnMachineState.listenToEvent({ name: 'DECK_EMPTY', data: null });
				$playerTurnMachineState = $playerTurnMachineState;

				updateBattleState();
				return;
			}
		}

		if ($gameStore.getCurrentBattle()?.getCurrentTurn().playerHand.getIsBusted() === true) {
			$playerTurnMachineState.listenToEvent({ name: 'BUST', data: null });
			$playerTurnMachineState = $playerTurnMachineState;

			scrollToElement('fighting');
			calculateAndApplyDamages();

			return;
		}

		$playerTurnMachineState.listenToEvent({ name: 'PLAY', data: null });
		$playerTurnMachineState = $playerTurnMachineState;
	}

	async function fight() {
		scrollToElement('fighting');

		$playerTurnMachineState.listenToEvent({ name: 'FIGHT', data: null });
		$playerTurnMachineState = $playerTurnMachineState;

		$enemyTurnMachineState.listenToEvent({ name: 'DRAW', data: null });
		$enemyTurnMachineState = $enemyTurnMachineState;

		try {
			await $enemyTurnMachineState.currentState.onStateExecute({ user: 'enemy' });
		} catch (e: any) {
			if (e.message === 'ENEMY_EMPTY_DECK') {
				$enemyTurnMachineState.listenToEvent({ name: 'DECK_EMPTY', data: null });
				$enemyTurnMachineState = $enemyTurnMachineState;

				$playerTurnMachineState.listenToEvent({ name: 'WIN', data: null });
				$playerTurnMachineState = $playerTurnMachineState;

				await updateBattleState();
				return;
			}
		}

		if ($gameStore.getCurrentBattle()?.getCurrentTurn().enemyHand.getIsBusted() === true) {
			$enemyTurnMachineState.listenToEvent({ name: 'BUST', data: null });
			$enemyTurnMachineState = $enemyTurnMachineState;

			await calculateAndApplyDamages();

			return;
		}

		$enemyTurnMachineState.listenToEvent({ name: 'PLAY', data: null });
		$enemyTurnMachineState = $enemyTurnMachineState;

		$enemyTurnMachineState.listenToEvent({ name: 'FIGHT', data: null });
		$enemyTurnMachineState = $enemyTurnMachineState;

		await calculateAndApplyDamages();
	}

	async function calculateAndApplyDamages() {
		$playerTurnMachineState.listenToEvent({ name: 'DAMAGE', data: null });
		$playerTurnMachineState = $playerTurnMachineState;
		$playerTurnMachineState.currentState.onStateEnter({ user: 'player' });
		$playerTurnMachineState.currentState.onStateExecute({});

		$enemyTurnMachineState.listenToEvent({ name: 'DAMAGE', data: null });
		$enemyTurnMachineState = $enemyTurnMachineState;

		if ($gameStore.getCurrentBattle()?.getCurrentTurn().fight.playerHasWon === true) {
			$playerTurnMachineState.listenToEvent({ name: 'WIN', data: null });
			$playerTurnMachineState = $playerTurnMachineState;
			$playerTurnMachineState.currentState.onStateEnter({ user: 'player' });

			$enemyTurnMachineState.listenToEvent({ name: 'LOSE', data: null });
			$enemyTurnMachineState = $enemyTurnMachineState;
		}

		if ($gameStore.getCurrentBattle()?.getCurrentTurn().fight.enemyHasWon === true) {
			$playerTurnMachineState.listenToEvent({ name: 'LOSE', data: null });
			$playerTurnMachineState = $playerTurnMachineState;

			$enemyTurnMachineState.listenToEvent({ name: 'WIN', data: null });
			$enemyTurnMachineState = $enemyTurnMachineState;
			$enemyTurnMachineState.currentState.onStateEnter({ user: 'enemy' });
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

		await updateBattleState();
	}

	async function newTurn() {
		scrollToElement('top');
		gameStore.endTurn();
		$playerTurnMachineState.listenToEvent({ name: 'NEW_TURN', data: null });
		$playerTurnMachineState = $playerTurnMachineState;

		try {
			await $playerTurnMachineState.currentState.onStateExecute({ user: 'player' });
		} catch (e: any) {
			if (e.message === 'PLAYER_EMPTY_DECK') {
				$playerTurnMachineState.listenToEvent({ name: 'DECK_EMPTY', data: null });
				$playerTurnMachineState = $playerTurnMachineState;

				updateBattleState();
				return;
			}
		}

		$playerTurnMachineState.listenToEvent({ name: 'PLAY', data: null });
		$playerTurnMachineState = $playerTurnMachineState;
		$playerTurnMachineState.currentState.onStateExecute({ user: 'player' });

		enemyTurnMachineState.update((state) => {
			state.currentState = new TurnPlayingState();
			return state;
		});
	}

	async function updateBattleState() {
		if ($enemyTurnMachineState.currentState.name === 'TurnDeckEmptyState') {
			$battleMachineState.listenToEvent({ name: 'WIN', data: null });
			$battleMachineState = $battleMachineState;

			await redirectToCamp();

			return;
		}

		if ($playerTurnMachineState.currentState.name === 'TurnDeckEmptyState') {
			$battleMachineState.listenToEvent({ name: 'LOSE', data: null });
			$battleMachineState = $battleMachineState;

			await delay(5000);
			$gameMachineState.listenToEvent({ name: 'END_GAME', data: null });
			$gameMachineState = $gameMachineState;

			return;
		}

		if ($gameStore.getCurrentBattle()?.enemy.currentHealth <= 0) {
			$battleMachineState.listenToEvent({ name: 'WIN', data: null });
			$battleMachineState = $battleMachineState;

			await redirectToCamp();
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

	async function redirectToCamp() {
		gameStore.endTurn();
		await delay(5000);

		$battleMachineState.listenToEvent({ name: 'CAMP', data: null });
		$battleMachineState = $battleMachineState;

		scrollToElement('top');
	}

	function openEnemyDiscardView() {
		openedEnemyDiscardView = !openedEnemyDiscardView;
	}

	function openPlayerDiscardView() {
		openedPlayerDiscardView = !openedPlayerDiscardView;
	}
</script>

{#if openedPlayerDiscardView}
	<DiscardPreview
		isPlayer={openedPlayerDiscardView}
		cards={$gameStore.player.discard.cards}
		on:close={() => openPlayerDiscardView()}
	/>
{/if}

{#if openedEnemyDiscardView}
	<DiscardPreview
		cards={$gameStore.getCurrentBattle().enemy.discard.cards}
		on:close={() => openEnemyDiscardView()}
	/>
{/if}

<section
	class="container h-full mx-auto flex flex-col justify-center items-center"
	id="battle-screen"
	transition:fade={{ delay: 250, duration: 300 }}
>
	<div class="flex md:hidden flex-col items-center justify-center w-full">
		<h1 class="h1">Battle {$gameStore?.battles.length}</h1>
		<h2 class="h2">Turn {$gameStore?.getCurrentBattle()?.turns.length}</h2>
	</div>
	<div class="flex flex-row flex-wrap items-center justify-between w-full">
		<PlayerSide
			player={$gameStore.player}
			playerHand={$gameStore.getCurrentBattle().getCurrentTurn().playerHand}
			currentStateName={$playerTurnMachineState.currentState.name}
			fight={$gameStore.getCurrentBattle().getCurrentTurn().fight}
			passiveEffects={$playerSideEffectsStore}
			on:draw={() => drawCard()}
			on:playerDiscardView={() => openPlayerDiscardView()}
			on:triggerEffect={(e) => triggerEffect(e.detail.object)}
		/>

		<div class="flex flex-col items-center justify-center md:h-full w-full md:w-4/12" id="fighting">
			<div class="hidden md:flex flex-col items-center justify-center w-full md:mb-20">
				<h1 class="h1">Battle {$gameStore?.battles.length}</h1>
				<h2 class="h2">Turn {$gameStore?.getCurrentBattle()?.turns.length}</h2>
			</div>

			<div class="flex flex-col md:flex-row md:flex-wrap w-full items-center justify-center">
				<BattlePower
					hand={$gameStore.getCurrentBattle().getCurrentTurn().playerHand}
					basePower={$gameStore.getCurrentBattle().getCurrentTurn().fight.basePowerForPlayer}
					currentStateName={$playerTurnMachineState.currentState.name}
				/>
				<CenterSide on:fight={() => fight()} on:newTurn={async () => await newTurn()} />
				<BattlePower
					hand={$gameStore.getCurrentBattle().getCurrentTurn().enemyHand}
					basePower={$gameStore.getCurrentBattle().getCurrentTurn().fight.basePowerForEnemy}
					currentStateName={$enemyTurnMachineState.currentState.name}
				/>
			</div>
		</div>

		<PlayerSide
			player={$gameStore.getCurrentBattle().enemy}
			playerHand={$gameStore.getCurrentBattle().getCurrentTurn().enemyHand}
			currentStateName={$enemyTurnMachineState.currentState.name}
			fight={$gameStore.getCurrentBattle().getCurrentTurn().fight}
			passiveEffects={$enemySideEffectsStore}
			isEnemy={true}
			on:enemyDiscardView={() => openEnemyDiscardView()}
		/>
	</div>
</section>
