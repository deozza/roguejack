<script lang="ts">
	import { gameStore } from '$lib/stores/game';
	import PlayerSide from '../battleScreen/PlayerSide.svelte';
	import { turnMachineState } from '$lib/stores/stateMachine/turn';
	import { battleMachineState } from '$lib/stores/stateMachine/battle';
	import { gameMachineState } from '$lib/stores/stateMachine/game';
	import CenterSide from '../battleScreen/CenterSide.svelte';
	import { enemySideEffectsStore, playerSideEffectsStore } from '$lib/stores/sideEffects';
	import { fade } from 'svelte/transition';
	import DiscardPreview from '../battleScreen/DiscardPreview.svelte';
	import { delay, scrollToElement } from '$lib/utils';
	import BattlePower from '../battleScreen/BattlePower.svelte';
	import type { Fight } from '$lib/models/fight/model';

	let openedEnemyDiscardView: boolean = false;
	let openedPlayerDiscardView: boolean = false;

	function drawCard() {

		try {
			$turnMachineState = $turnMachineState.listenToEvent({ name: 'DRAW', data: null });
		} catch (e: any) {
			if (e.message === 'PLAYER_EMPTY_DECK') {
				$turnMachineState = $turnMachineState.listenToEvent({ name: 'DECK_EMPTY', data: null });

				updateBattleState();
				return;
			}
		}

		if ($gameStore.getCurrentBattle()?.getCurrentTurn().playerHand.getIsBusted() === true) {
			$turnMachineState = $turnMachineState.listenToEvent({ name: 'BUST', data: null });
			
			scrollToElement('fighting');
			calculateAndApplyDamages();

			return;
		}

		$turnMachineState = $turnMachineState.listenToEvent({ name: 'PLAY', data: null });
	}

	async function fight() {
		scrollToElement('fighting');

		$turnMachineState = $turnMachineState.listenToEvent({ name: 'FIGHT', data: null });

		$turnMachineState = $turnMachineState.listenToEvent({ name: 'PLAY', data: null });

		try {
			while($gameStore.getCurrentBattle()?.getCurrentTurn().enemyHand.value < 300) {
				delay(1000);
				$turnMachineState = $turnMachineState.listenToEvent({ name: 'DRAW', data: null });

				if ($gameStore.getCurrentBattle()?.getCurrentTurn()?.enemyHand.getIsBusted() === true) {
					throw new Error('ENEMY_BUSTED_HAND');
				}

				$turnMachineState = $turnMachineState.listenToEvent({ name: 'PLAY', data: null });
			}
		} catch (e: any) {
			if (e.message === 'ENEMY_EMPTY_DECK') {
				$turnMachineState = $turnMachineState.listenToEvent({ name: 'DECK_EMPTY', data: null });

				await updateBattleState();
				return;
			}
		}

		if ($gameStore.getCurrentBattle()?.getCurrentTurn().enemyHand.getIsBusted() === true) {
			$turnMachineState = $turnMachineState.listenToEvent({ name: 'BUST', data: null });

			await calculateAndApplyDamages();

			return;
		}

		$turnMachineState = $turnMachineState.listenToEvent({ name: 'FIGHT', data: null });

		await calculateAndApplyDamages();
	}

	async function calculateAndApplyDamages() {
		$turnMachineState = $turnMachineState.listenToEvent({ name: 'DAMAGE', data: null });

		const fight: Fight = $gameStore.getCurrentBattle().getCurrentTurn().fight;
		if(fight.playerHasWon) {
			$turnMachineState = $turnMachineState.listenToEvent({ name: 'WIN', data: null });
		} 

		if(fight.enemyHasWon) {
			$turnMachineState = $turnMachineState.listenToEvent({ name: 'LOSE', data: null });
		}

		if(fight.enemyHasWon === false && fight.playerHasWon === false) {
			$turnMachineState = $turnMachineState.listenToEvent({ name: 'TIE', data: null });
		}

		await updateBattleState();
	}

	async function prepareNewTurn() {
		scrollToElement('top');
		gameStore.endTurn();

		$turnMachineState = $turnMachineState.listenToEvent({ name: 'RESET', data: null });


		try {
			$turnMachineState = $turnMachineState.listenToEvent({ name: 'NEW_TURN', data: null });

		} catch (e: any) {
			if (e.message === 'PLAYER_EMPTY_DECK') {
				$turnMachineState = $turnMachineState.listenToEvent({ name: 'DECK_EMPTY', data: null });

				updateBattleState();
				return;
			}
		}

		$turnMachineState = $turnMachineState.listenToEvent({ name: 'PLAY', data: null });
	}

	async function updateBattleState() {
		if ($turnMachineState.currentState.name === 'TurnEnemyDeckEmptyState') {
			$battleMachineState = $battleMachineState.listenToEvent({ name: 'WIN', data: null });

			await redirectToCamp();

			return;
		}

		if ($turnMachineState.currentState.name === 'TurnPlayerDeckEmptyState') {
			$battleMachineState = $battleMachineState.listenToEvent({ name: 'LOSE', data: null });

			await delay(5000);
			$gameMachineState = $gameMachineState.listenToEvent({ name: 'END_GAME', data: null });

			return;
		}

		if ($gameStore.getCurrentBattle()?.enemy.currentHealth <= 0) {
			$battleMachineState = $battleMachineState.listenToEvent({ name: 'WIN', data: null });
			$battleMachineState;

			await redirectToCamp();
			return;
		}

		if ($gameStore.player.currentHealth <= 0) {
			$battleMachineState = $battleMachineState.listenToEvent({ name: 'LOSE', data: null });

			$gameMachineState = $gameMachineState.listenToEvent({ name: 'END_GAME', data: null });

			return;
		}
	}

	async function redirectToCamp() {


		await delay(5000);
		$battleMachineState = $battleMachineState.listenToEvent({ name: 'CAMP', data: null });
		
		await delay(1000);
		$turnMachineState = $turnMachineState.listenToEvent({ name: 'RESET', data: null });
		scrollToElement('top');
		gameStore.endTurn();

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
			user={$gameStore.player}
			userHand={$gameStore.getCurrentBattle().getCurrentTurn().playerHand}
			currentStateName={$turnMachineState.currentState.name}
			passiveEffects={$playerSideEffectsStore}
			on:draw={() => drawCard()}
			on:playerDiscardView={() => openPlayerDiscardView()}
			on:updateBattleState={() => updateBattleState()}
		/>

		<div class="flex flex-col items-center justify-center md:h-full w-full md:w-4/12" id="fighting">
			<div class="hidden md:flex flex-col items-center justify-center w-full md:mb-20">
				<h1 class="h1">Battle {$gameStore?.battles.length}</h1>
				<h2 class="h2">Turn {$gameStore?.getCurrentBattle()?.turns.length}</h2>
			</div>

			<div class="flex flex-col md:flex-row md:flex-wrap w-full items-center justify-center">
				<BattlePower
					hand={$gameStore.getCurrentBattle().getCurrentTurn().playerHand}
					bonusValue={$gameStore.getCurrentBattle().getCurrentTurn().fight.bonusValueForPlayer}
					bonusDamage={$gameStore.getCurrentBattle().getCurrentTurn().fight.bonusDamageToEnemy}
					currentStateName={$turnMachineState.currentState.name}
				/>
				<CenterSide on:fight={() => fight()} on:newTurn={async () => await prepareNewTurn()} />
				<BattlePower
					hand={$gameStore.getCurrentBattle().getCurrentTurn().enemyHand}
					bonusValue={$gameStore.getCurrentBattle().getCurrentTurn().fight.bonusValueForEnemy}
					bonusDamage={$gameStore.getCurrentBattle().getCurrentTurn().fight.bonusDamageToPlayer}
					currentStateName={$turnMachineState.currentState.name}
				/>
			</div>
		</div>

		<PlayerSide
			user={$gameStore.getCurrentBattle().enemy}
			userHand={$gameStore.getCurrentBattle().getCurrentTurn().enemyHand}
			currentStateName={$turnMachineState.currentState.name}
			passiveEffects={$enemySideEffectsStore}
			isEnemy={true}
			on:enemyDiscardView={() => openEnemyDiscardView()}
		/>
	</div>
</section>
