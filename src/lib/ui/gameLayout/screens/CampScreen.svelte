<script lang="ts">
	import { TurnPlayingState } from '$lib/models/stateMachine/turn/states/turnPlayingState';
	import { gameStore } from '$lib/stores/game';
	import { battleMachineState } from '$lib/stores/stateMachine/battle';
	import { enemyTurnMachineState, playerTurnMachineState } from '$lib/stores/stateMachine/turn';
	import Deck from '$lib/ui/deck/Deck.svelte';
	import Discard from '$lib/ui/deck/Discard.svelte';
	import { fade } from 'svelte/transition';
	import DiscardPreview from '../battleScreen/DiscardPreview.svelte';
	import DeckPreview from '../battleScreen/DeckPreview.svelte';
	import { triggerEffects } from '$lib/models/effect';
	import type EffectInterface from '$lib/models/effect/effectInterface';
	import {
		raritiesWeight,
		type RaritiesWeight
	} from '$lib/models/effect/raritiesType';
	import Icon from '@iconify/svelte';

	let openedDeckView: boolean = false;
	let openedDiscardView: boolean = false;
	const objectToLoot: EffectInterface = getObjectToLoot();

	function openDeckView() {
		openedDeckView = !openedDeckView;
	}

	function openDiscardView() {
		openedDiscardView = !openedDiscardView;
	}

	function healAtCamp() {
		gameStore.healPercentages(10, 'player');
		startNewBattle();
	}

	function recycleAtCamp() {
		gameStore.recycleDiscard(4, 'player');

		startNewBattle();
	}

	function getObjectToLoot(): EffectInterface {
		const rarityWeightValue: number = Math.floor(Math.random() * 100 + 1);

		const rarity: RaritiesWeight | undefined = raritiesWeight.find(
			(rarity) => rarity.weight >= rarityWeightValue
		);
		if (rarity === undefined) {
			throw new Error(`Rarity ${rarityWeightValue} not found`);
		}

		const filteredEffects: EffectInterface[] = triggerEffects.filter(
			(triggerEffect: EffectInterface) => triggerEffect.rarity === rarity.rarity
		);

		const randomEffectIndex: number = Math.floor(Math.random() * filteredEffects.length);
		return filteredEffects[randomEffectIndex];
	}

	function addToInventory(object: EffectInterface) {
		gameStore.addToInventory(object, 'player');

		startNewBattle();
	}

	function startNewBattle() {
		$battleMachineState.listenToEvent({ name: 'NEW_BATTLE', data: null });
		$battleMachineState = $battleMachineState;
		$battleMachineState.currentState.onStateEnter({ user: 'player' });
		$battleMachineState.currentState.onStateExecute({});

		$battleMachineState.listenToEvent({ name: 'PLAY', data: null });
		$battleMachineState = $battleMachineState;

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
			<div class="flex flex-col  items-center justify-center w-full md:w-9/12 h-full">
				<h1 class="h1 max-sm:hidden">Camp</h1>
				<div class="flex flex-col items-center justify-center w-full h-full overflow-y-auto space-y-5">

					<div class="flex flex-col items-center justify-left w-9/12 p-4 variant-ringed-tertiary rounded-md text-center">
						<p class="p text-xl uppercase">Sleep</p>
						<p class="p">Heal 10%hp</p>
						<button class="btn variant-ghost-tertiary uppercase" on:click={() => healAtCamp()}
							>select</button
						>
					</div>
					<div class="flex flex-col items-center justify-around w-9/12 p-4 variant-ringed-tertiary rounded-md text-center">
						<p class="p text-xl uppercase">Recycle discard</p>
						<p class="p">Shuffle last 4 cards from discard to deck</p>
						<button class="btn variant-ghost-tertiary uppercase" on:click={() => recycleAtCamp()}
							>select</button
						>
					</div>
					<div class="flex flex-col items-center justify-around w-9/12 p-4 variant-ringed-success rounded-md text-center">
						<p class="p text-xl uppercase">{objectToLoot.name}</p>
						<p class="p">{objectToLoot.description}</p>
						<button
						class="btn variant-ghost-success uppercase"
						on:click={() => addToInventory(objectToLoot)}>loot</button
					>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
