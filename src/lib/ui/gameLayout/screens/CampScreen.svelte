<script lang="ts">
	import { gameStore } from '$lib/stores/game';
	import { battleMachineState } from '$lib/stores/stateMachine/battle';
	import { turnMachineState } from '$lib/stores/stateMachine/turn';
	import DiscardPreview from '../battleScreen/DiscardPreview.svelte';
	import DeckPreview from '../battleScreen/DeckPreview.svelte';
	import { gameMachineState } from '$lib/stores/stateMachine/game';
	import { randomIntFromInterval } from '$lib/utils';
	import type { ItemTypes } from '$lib/models/items/types';
	import { getRandomItemByWeight } from '$lib/models/items';
	import { defaultRaritiesWeights, Rarities, type RaritiesWeight } from '$lib/models/items/enums';
	import { EnnemyType } from '$lib/models/characters/types';
	import { isArmor, type ArmorInterface, type ConsumableInterface } from '$lib/models/items/interfaces';
	import PackOfCards from '$lib/models/items/consumable/packOfCards';
	import GreaterPackOfCards from '$lib/models/items/consumable/greaterPackOfCards';
	import SuperiorPackOfCards from '$lib/models/items/consumable/superiorPackOfCards';

	let openedDeckView: boolean = false;
	let openedDiscardView: boolean = false;
	let objectsToLoot: ItemTypes[] = getAllObjectsToLoot();

	function getAllObjectsToLoot(): ItemTypes[] {

		let objectsToLoot: ItemTypes[] = [];

		const packOfCards: ConsumableInterface | null = getPackOfCards();
		if(packOfCards !== null) {
			objectsToLoot = [...objectsToLoot, packOfCards];
		}

		if($gameStore.getCurrentBattle()?.enemy.type === EnnemyType.boss || $gameStore.getCurrentBattle()?.enemy.type === EnnemyType.miniboss) {
			objectsToLoot = [...objectsToLoot, getRandomItemByWeight()];
		}

		objectsToLoot = [...objectsToLoot, ...$gameStore.getCurrentBattle().enemy.inventory];

		return objectsToLoot

	}

	function getPackOfCards(): ConsumableInterface | null {
		
		const rarityWeightValue: number = randomIntFromInterval(1, 100);

		const rarity: RaritiesWeight | undefined = defaultRaritiesWeights.find(
			(rarity: RaritiesWeight) => rarity.weight >= rarityWeightValue
		);

		switch(rarity?.rarity) {
			case Rarities.common:
				return null
			case Rarities.uncommon:
				return null;
			case Rarities.rare:
				return new PackOfCards();
			case Rarities.epic:
				return new GreaterPackOfCards();
			case Rarities.legendary:
				return new SuperiorPackOfCards();
			default:
				return null;
		}
	}

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
		if (item.technicalName.includes('ackOfCards')) {
			item.applyEffects('player');
		} else {
			if(isArmor(item)) {
				const armor: ArmorInterface = item as ArmorInterface;
				gameStore.addToArmors(armor, 'player');
			}else {
				gameStore.addToInventory(item, 'player');
			}
		}

		objectsToLoot = objectsToLoot.filter(
			(objectsToLoot) => objectsToLoot.technicalName !== item.technicalName
		);	}

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
>
	<div class="flex flex-col items-center justify-center h-full w-full">
		<h1 class="h1 md:hidden">Camp</h1>
		<div class="flex flex-row flex-wrap items-center justify-around w-full">
			<div class="flex flex-col items-center justify-center w-full md:w-9/12 h-full">
				<h1 class="h1 max-sm:hidden">Camp</h1>
				<div
					class="flex flex-col items-center justify-center w-full h-full overflow-y-auto space-y-5"
				>
					<p class="p italic text-xl">Get some rest after your last fight.</p>
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

					{#each objectsToLoot as objectToLoot} 
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
					{/each}

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
