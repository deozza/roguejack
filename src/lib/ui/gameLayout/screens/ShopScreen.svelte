<script lang="ts">
	import { TurnPlayingState } from '$lib/models/stateMachine/turn/states/turnPlayingState';
	import { gameStore } from '$lib/stores/game';
	import { battleMachineState } from '$lib/stores/stateMachine/battle';
	import { enemyTurnMachineState, playerTurnMachineState } from '$lib/stores/stateMachine/turn';
	import Deck from '$lib/ui/deck/Deck.svelte';
	import Discard from '$lib/ui/deck/Discard.svelte';
	import Icon from '@iconify/svelte';
	import { fade } from 'svelte/transition';
	import DiscardPreview from '../battleScreen/DiscardPreview.svelte';
	import DeckPreview from '../battleScreen/DeckPreview.svelte';
	import { triggerEffects } from '$lib/models/effect';
	import { randomIntFromInterval } from '$lib/utils';
	import { raritiesWeight, type RaritiesWeight } from '$lib/models/effect/raritiesType';
	import { TurnMachineState } from '$lib/models/stateMachine/turn/turnMachineState';
	import { gameMachineState } from '$lib/stores/stateMachine/game';
	import PackOfCards from '$lib/models/effect/trigger/packOfCards';
	import type { TriggerEffectInterface } from '$lib/models/effect/interfaces';

	let openedDeckView: boolean = false;
	let openedDiscardView: boolean = false;
	let objectsToBuy: TriggerEffectInterface[] = getObjectsToBuy();

	function openDeckView() {
		openedDeckView = !openedDeckView;
	}

	function openDiscardView() {
		openedDiscardView = !openedDiscardView;
	}

	function getPriceByRarity(object: TriggerEffectInterface): number {
		if (object.technicalName === 'packOfCards') {
			return 0;
		}

		switch (object.rarity) {
			case 'common':
				return 3;
			case 'uncommon':
				return 5;
			case 'rare':
				return 10;
			case 'epic':
				return 15;
			case 'legendary':
				return 30;
			default:
				return 0;
		}
	}

	function getObjectsToBuy(): TriggerEffectInterface[] {
		const objectsToBuy: TriggerEffectInterface[] = [];
		for (let i = 0; i < 3; i++) {
			objectsToBuy.push(getObjectToBuy());
		}

		const packOfCards: TriggerEffectInterface = new PackOfCards();
		objectsToBuy.push(packOfCards);

		return objectsToBuy;
	}

	function getObjectToBuy(): TriggerEffectInterface {
		const rarityWeightValue: number = randomIntFromInterval(1, 100);

		const rarity: RaritiesWeight | undefined = raritiesWeight.find(
			(rarity) => rarity.weight >= rarityWeightValue
		);
		if (rarity === undefined) {
			throw new Error(`Rarity ${rarityWeightValue} not found`);
		}

		const filteredEffects: TriggerEffectInterface[] = triggerEffects.filter(
			(triggerEffect: TriggerEffectInterface) => triggerEffect.rarity === rarity.rarity
		);

		const randomEffectIndex: number = randomIntFromInterval(0, filteredEffects.length - 1);
		return filteredEffects[randomEffectIndex];
	}

	function buyObject(object: TriggerEffectInterface) {
		if ($gameStore.player.deck.cards.length < getPriceByRarity(object.rarity)) {
			return;
		}

		if (object.technicalName === 'packOfCards') {
			object.effect({ user: 'player' });
			objectsToBuy = objectsToBuy.filter(
				(objectToBuy) => objectToBuy.technicalName !== object.technicalName
			);
			return;
		}

		gameStore.update((game) => {
			for (let i = 0; i < getPriceByRarity(object.rarity); i++) {
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
		$battleMachineState.listenToEvent({ name: 'NEW_BATTLE', data: null });
		$battleMachineState = $battleMachineState;
		$battleMachineState.currentState.onStateEnter({ user: 'player' });
		$battleMachineState.currentState.onStateExecute({});

		$battleMachineState.listenToEvent({ name: 'PLAY', data: null });
		$battleMachineState = $battleMachineState;

		playerTurnMachineState.set(new TurnMachineState());

		$playerTurnMachineState.listenToEvent({ name: 'NEW_TURN', data: { user: 'player' } });
		$playerTurnMachineState = $playerTurnMachineState;

		try {
			$playerTurnMachineState.currentState.onStateExecute({ user: 'player' });
		} catch (error) {
			$playerTurnMachineState.listenToEvent({ name: 'DECK_EMPTY', data: { user: 'player' } });
			$playerTurnMachineState = $playerTurnMachineState;

			$battleMachineState.listenToEvent({ name: 'DECK_EMPTY', data: null });
			$battleMachineState = $battleMachineState;

			$gameMachineState.listenToEvent({ name: 'END_GAME', data: null });
			$gameMachineState = $gameMachineState;
			return;
		}

		$playerTurnMachineState.listenToEvent({ name: 'PLAY', data: { user: 'player' } });
		$playerTurnMachineState = $playerTurnMachineState;
		$playerTurnMachineState.currentState.onStateExecute({ user: 'player' });

		enemyTurnMachineState.update((state) => {
			state.currentState = new TurnPlayingState();
			return state;
		});
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
	transition:fade={{ delay: 250, duration: 300 }}
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
					<p class="p italic text-xl">Exchange the top cards of your deck to get powerful items</p>

					{#each objectsToBuy as object}
						<div
							class="flex flex-col items-center justify-around w-9/12 p-4 rounded-md text-center"
							class:variant-ringed-tertiary={object.rarity === 'common'}
							class:variant-ringed-primary={object.rarity === 'uncommon'}
							class:variant-ringed-secondary={object.rarity === 'rare'}
							class:variant-ringed-warning={object.rarity === 'epic'}
							class:variant-ringed-danger={object.rarity === 'legendary'}
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
