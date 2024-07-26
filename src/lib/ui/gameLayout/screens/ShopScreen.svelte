<script lang="ts">
	import { gameStore } from '$lib/stores/game';
	import { battleMachineState } from '$lib/stores/stateMachine/battle';
	import { turnMachineState } from '$lib/stores/stateMachine/turn';
	import Deck from '$lib/ui/deck/Deck.svelte';
	import Discard from '$lib/ui/deck/Discard.svelte';
	import Icon from '@iconify/svelte';
	import { fade } from 'svelte/transition';
	import DiscardPreview from '../battleScreen/DiscardPreview.svelte';
	import DeckPreview from '../battleScreen/DeckPreview.svelte';
	import { gameMachineState } from '$lib/stores/stateMachine/game';
	import type { ItemTypes } from '$lib/models/items/types';
	import { getRandomItemByWeight } from '$lib/models/items';
	import type { ConsumableInterface } from '$lib/models/items/interfaces';
	import PackOfCards from '$lib/models/items/consumable/packOfCards';
	import { Rarities } from '$lib/models/items/enums';

	let openedDeckView: boolean = false;
	let openedDiscardView: boolean = false;
	let objectsToBuy: Array<ItemTypes> = getObjectsToBuy();

	function openDeckView() {
		openedDeckView = !openedDeckView;
	}

	function openDiscardView() {
		openedDiscardView = !openedDiscardView;
	}

	function getPriceByRarity(object: ItemTypes): number {
		if (object.technicalName === 'packOfCards') {
			return 0;
		}

		switch (object.rarity) {
			case Rarities.common:
				return 3;
			case Rarities.uncommon:
				return 5;
			case Rarities.rare:
				return 10;
			case Rarities.epic:
				return 15;
			case Rarities.legendary:
				return 30;
			default:
				return 0;
		}
	}

	function getObjectsToBuy(): Array<ItemTypes> {
		const objectsToBuy: Array<ItemTypes> = [];
		for (let i = 0; i < 3; i++) {
			objectsToBuy.push(getRandomItemByWeight());
		}

		const packOfCards: ConsumableInterface = new PackOfCards();
		objectsToBuy.push(packOfCards);

		return objectsToBuy;
	}

	function buyObject(object: ItemTypes) {
		if ($gameStore.player.deck.cards.length < getPriceByRarity(object)) {
			return;
		}

		if (object.technicalName === 'packOfCards') {
			object.applyEffects('player');
			objectsToBuy = objectsToBuy.filter(
				(objectToBuy) => objectToBuy.id !== object.id
			);
			return;
		}

		gameStore.update((game) => {
			for (let i = 0; i < getPriceByRarity(object); i++) {
				game.player.deck.drawTopCard();
			}
			return game;
		});

		gameStore.addToInventory(object, 'player');

		objectsToBuy = objectsToBuy.filter(
			(objectToBuy) => objectToBuy.technicalName !== object.technicalName
		);
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
	id="shop-screen"
>
	<div class="flex flex-col items-center justify-center h-full w-full">
		<h1 class="h1 md:hidden">Shop</h1>
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
				<h1 class="h1 max-sm:hidden">Shop</h1>
				<div
					class="flex flex-col items-center justify-center w-full h-full overflow-y-auto space-y-5"
				>
					<p class="p italic text-xl">Exchange the top cards of your deck to get powerful items.</p>

					{#each objectsToBuy as object}
						<div
							class="flex flex-col items-center justify-around w-9/12 p-4 rounded-md text-center"
							class:variant-ringed-tertiary={object.rarity === Rarities.common}
							class:variant-ringed-primary={object.rarity === Rarities.uncommon}
							class:variant-ringed-secondary={object.rarity === Rarities.rare}
							class:variant-ringed-warning={object.rarity === Rarities.epic}
							class:variant-ringed-danger={object.rarity === Rarities.legendary}
						>
							<p class="p text-xl uppercase">{object.name}</p>
							<p class="p">{object.description}</p>

							<button
								class="btn variant-ghost-warning uppercase rounded-md mt-6"
								on:click={() => buyObject(object)}
							>
								Buy ({getPriceByRarity(object)}
								<Icon icon="game-icons:card-burn" width="32" height="32" />)
							</button>
						</div>
					{/each}

					<button
						class="btn rounded-md variant-filled-tertiary uppercase"
						on:click={() => startNewBattle()}
					>
						Exit shop
					</button>
				</div>
			</div>
		</div>
	</div>
</section>
