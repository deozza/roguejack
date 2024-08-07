<script lang="ts">
	import { gameStore } from '$lib/stores/game';
	import PlayerSide from '../battleScreen/PlayerSide.svelte';
	import { turnMachineState } from '$lib/stores/stateMachine/turn';
	import CenterSide from '../battleScreen/CenterSide.svelte';
	import DiscardPreview from '../battleScreen/DiscardPreview.svelte';
	import { delay, scrollToElement, updateBattleState } from '$lib/utils';
	import type { Fight } from '$lib/models/fight/model';
	import { Card } from '$lib/models/card/model';
	import type { Game } from '$lib/models/game/model';
	import type { ItemTypes } from '$lib/models/items/types';
	import { enemyUsingItemStore } from '$lib/stores/sideEffects';

	let openedEnemyDiscardView: boolean = false;
	let openedPlayerDiscardView: boolean = false;

	async function drawCard() {
		try {
			$turnMachineState = $turnMachineState.listenToEvent({ name: 'DRAW', data: null });
		} catch (e: any) {
			if (e.message === 'PLAYER_EMPTY_DECK') {
				const card: Card = new Card('grim-reaper', '0');

				gameStore.update((game: Game) => {
					game.getCurrentBattle().getCurrentTurn()?.playerHand.addCard(card);
					return game;
				});

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
		await updateBattleState();
	}

	async function fight() {
		scrollToElement('fighting');

		$turnMachineState = $turnMachineState.listenToEvent({ name: 'FIGHT', data: null });

		$turnMachineState = $turnMachineState.listenToEvent({ name: 'PLAY', data: null });

		try {
			while (
				$gameStore.getCurrentBattle()?.getCurrentTurn().enemyHand.value <
				$gameStore.getCurrentBattle()?.enemy.minAttack
			) {
				await delay(1000);

				//if enemy has less than 50% health and 50% chance, then use item
				if (
					$gameStore.getCurrentBattle()?.enemy.getHealthPercentage() <= 0.5 &&
					Math.random() > 0.5
				) {
					if ($gameStore.getCurrentBattle()?.enemy.inventory.length > 0) {
						enemyUseItem();
						break;
					}
				}

				$turnMachineState = $turnMachineState.listenToEvent({ name: 'DRAW', data: null });

				if ($gameStore.getCurrentBattle()?.getCurrentTurn()?.enemyHand.getIsBusted() === true) {
					throw new Error('ENEMY_BUSTED_HAND');
				}

				$turnMachineState = $turnMachineState.listenToEvent({ name: 'PLAY', data: null });
			}
		} catch (e: any) {
			if (e.message === 'ENEMY_EMPTY_DECK') {
				const card: Card = new Card('grim-reaper', '0');
				gameStore.update((game: Game) => {
					game.getCurrentBattle().getCurrentTurn().enemyHand.addCard(card);
					return game;
				});

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

	async function enemyUseItem() {
		const item: ItemTypes = $gameStore.getCurrentBattle().enemy.inventory[0];

		enemyUsingItemStore.set(item);

		$turnMachineState = $turnMachineState.listenToEvent({ name: 'USE_ITEM', data: null });

		$turnMachineState = $turnMachineState.listenToEvent({ name: 'PLAY', data: null });

		await updateBattleState();
	}

	async function calculateAndApplyDamages() {
		$turnMachineState = $turnMachineState.listenToEvent({ name: 'DAMAGE', data: null });

		const fight: Fight = $gameStore.getCurrentBattle().getCurrentTurn().fight;

		if (fight.enemyHasWon === false && fight.playerHasWon === false) {
			$turnMachineState = $turnMachineState.listenToEvent({ name: 'TIE', data: null });
		}

		if (fight.playerHasWon === true) {
			$turnMachineState = $turnMachineState.listenToEvent({ name: 'WIN', data: null });
		}

		if (fight.enemyHasWon === true) {
			$turnMachineState = $turnMachineState.listenToEvent({ name: 'LOSE', data: null });
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
				await updateBattleState();
				return;
			}
		}

		$turnMachineState = $turnMachineState.listenToEvent({ name: 'PLAY', data: null });
		await updateBattleState();
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
			fight={$gameStore.getCurrentBattle().getCurrentTurn().fight}
			on:draw={async () => await drawCard()}
			on:playerDiscardView={() => openPlayerDiscardView()}
			on:updateBattleState={() => updateBattleState()}
		/>

		<div class="flex flex-col items-center justify-center md:h-full w-full md:w-4/12" id="fighting">
			<div class="hidden md:flex flex-col items-center justify-center w-full md:mb-20">
				<h1 class="h1">Battle {$gameStore?.battles.length}</h1>
				<h2 class="h2">Turn {$gameStore?.getCurrentBattle()?.turns.length}</h2>
			</div>

			<div class="flex flex-col md:flex-row md:flex-wrap w-full items-center justify-center">
				<CenterSide on:fight={() => fight()} on:newTurn={async () => await prepareNewTurn()} />
			</div>
		</div>

		<PlayerSide
			user={$gameStore.getCurrentBattle().enemy}
			userHand={$gameStore.getCurrentBattle().getCurrentTurn().enemyHand}
			currentStateName={$turnMachineState.currentState.name}
			fight={$gameStore.getCurrentBattle().getCurrentTurn().fight}
			on:enemyDiscardView={() => openEnemyDiscardView()}
		/>
	</div>
</section>
