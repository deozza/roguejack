<script lang="ts">
	import { gameStore } from '$lib/stores/game';
	import { battleMachineState } from '$lib/stores/stateMachine/battle';
	import { turnMachineState } from '$lib/stores/stateMachine/turn';
	import Deck from '$lib/ui/deck/Deck.svelte';
	import Discard from '$lib/ui/deck/Discard.svelte';
	import { fade } from 'svelte/transition';
	import DiscardPreview from '../battleScreen/DiscardPreview.svelte';
	import DeckPreview from '../battleScreen/DeckPreview.svelte';
	import Icon from '@iconify/svelte';
	import { TurnMachineState } from '$lib/models/stateMachine/turn/turnMachineState';
	import { gameMachineState } from '$lib/stores/stateMachine/game';
	import { randomIntFromInterval } from '$lib/utils';
	import type { ItemTypes } from '$lib/models/items/types';
	import { getRandomItemByWeight } from '$lib/models/items';
	import { Rarities } from '$lib/models/items/enums';

	let openedDeckView: boolean = false;
	let openedDiscardView: boolean = false;
	const objectToLoot: ItemTypes = getRandomItemByWeight();

	function openDeckView() {
		openedDeckView = !openedDeckView;
	}

	function openDiscardView() {
		openedDiscardView = !openedDiscardView;
	}

	function healAtCamp() {
		gameStore.healPercentages(randomIntFromInterval(1, 5) * 10, 'player');
		goToNextState();
	}

	function recycleAtCamp() {
		gameStore.recycleDiscard(randomIntFromInterval(2, 6), 'player');

		goToNextState();
	}


	function addToInventory(item: ItemTypes) {
		if (item.technicalName === 'packOfCards') {
			item.effect({ user: 'player' });
			goToNextState();
			return;
		}
		gameStore.addToInventory(item, 'player');

		goToNextState();
	}

	function goToNextState() {
		if ($gameStore.battles.length % 10 === 0) {
			goToShop();
			return;
		}

		startNewBattle();
		return;
	}

	function goToShop() {
		$battleMachineState = $battleMachineState.listenToEvent({ name: 'SHOP', data: null });
		return;
	}

	function startNewBattle() {

		$battleMachineState = $battleMachineState.listenToEvent({ name: 'RESET', data: null });
		$battleMachineState = $battleMachineState.listenToEvent({ name: 'NEW_BATTLE', data: null });

		$battleMachineState = $battleMachineState.listenToEvent({ name: 'PLAY', data: null });

		try {
			$turnMachineState = $turnMachineState.listenToEvent({ name: 'NEW_TURN', data: null });
		} catch (error) {
			$turnMachineState = $turnMachineState.listenToEvent({ name: 'DECK_EMPTY', data: null });

			$battleMachineState = $battleMachineState.listenToEvent({ name: 'DECK_EMPTY', data: null });

			$gameMachineState = $gameMachineState.listenToEvent({ name: 'END_GAME', data: null });
			return;
		}

		$turnMachineState = $turnMachineState.listenToEvent({ name: 'PLAY', data: null });
	}
</script>

{#if openedDiscardView}
	<DiscardPreview
		isPlayer={true}
		cards={$gameStore.player.discard.cards}
		on:close={() => openDiscardView()}
	/>
{/if}

{#if openedDeckView}
	<DeckPreview cards={$gameStore.player.deck.cards} on:close={() => openDeckView()} />
{/if}

<section
	class="container h-full mx-auto flex flex-col justify-left items-start space-y-10"
	id="camp-screen"
	transition:fade={{ delay: 250, duration: 300 }}
>
	<div class="flex flex-col items-center justify-center h-full w-full">
		<h1 class="h1 md:hidden">Camp</h1>
		<div class="flex flex-row flex-wrap items-center justify-around w-full">
			<div class="flex flex-col items-center justify-center w-full md:w-2/12">
				<h2 class="h2">Status</h2>
				<div class="flex flex-row md:flex-col items-center justify-center">
					<p class="flex flex-row items-center justify-center text-error-500">
						<Icon icon="game-icons:hearts" width="16" height="16" />
						{$gameStore.player.currentHealth}/{$gameStore.player.maxHealth}
					</p>
					<button on:click={() => openDeckView()} type="button">
						<Deck deckSize={$gameStore.player.deck.cards.length} />
					</button>
					<button on:click={() => openDiscardView()} type="button">
						<Discard discardSize={$gameStore.player.discard.cards.length} />
					</button>
				</div>
			</div>
			<div class="flex flex-col items-center justify-center w-full md:w-9/12 h-full">
				<h1 class="h1 max-sm:hidden">Camp</h1>
				<div
					class="flex flex-col items-center justify-center w-full h-full overflow-y-auto space-y-5"
				>
					<div
						class="flex flex-col items-center justify-left w-9/12 p-4 variant-ringed-tertiary rounded-md text-center"
					>
						<p class="p text-xl uppercase">Sleep</p>
						<p class="p">Heal between 10% and 50% of your HP</p>
						<button class="btn variant-ghost-tertiary uppercase" on:click={() => healAtCamp()}
							>select</button
						>
					</div>
					<div
						class="flex flex-col items-center justify-around w-9/12 p-4 variant-ringed-tertiary rounded-md text-center"
					>
						<p class="p text-xl uppercase">Recycle discard</p>
						<p class="p">Shuffle between 2 and 6 last cards from discard to deck</p>
						<button class="btn variant-ghost-tertiary uppercase" on:click={() => recycleAtCamp()}
							>select</button
						>
					</div>

					{#if $gameStore.battles.length % 5 === 0}
						<div
							class="flex flex-col items-center justify-around w-9/12 p-4 variant-ringed-success rounded-md text-center"
							class:variant-ringed-tertiary={objectToLoot.rarity === Rarities.common}
							class:variant-ringed-primary={objectToLoot.rarity === Rarities.uncommon}
							class:variant-ringed-secondary={objectToLoot.rarity === Rarities.rare}
							class:variant-ringed-warning={objectToLoot.rarity === Rarities.epic}
							class:variant-ringed-danger={objectToLoot.rarity === Rarities.legendary}
						>
							<p class="p text-xl uppercase">{objectToLoot.name}</p>
							<p class="p">{objectToLoot.description}</p>
							<button
								class="btn variant-ghost-success uppercase"
								on:click={() => addToInventory(objectToLoot)}>loot</button
							>
						</div>
					{/if}

					<button
						class="btn rounded-md variant-filled-tertiary uppercase"
						on:click={() => startNewBattle()}
					>
						Exit camp
					</button>
				</div>
			</div>
		</div>
	</div>
</section>
