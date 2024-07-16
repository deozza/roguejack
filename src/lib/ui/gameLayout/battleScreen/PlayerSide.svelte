<script lang="ts">
	import type { Hand } from '$lib/models/hand/model';
	import Icon from '@iconify/svelte';
	import Deck from '../../deck/Deck.svelte';
	import Discard from '../../deck/Discard.svelte';
	import PlayingCard from '../../playingCard/PlayingCard.svelte';
	import Healthbar from '../../character/Healthbar.svelte';
	import type { Fight } from '$lib/models/fight/model';
	import type EffectInterface from '$lib/models/effect/effectInterface';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';
	import type { Character } from '$lib/models/character/model';
	import { fade } from 'svelte/transition';

	export let player: Character;
	export let playerHand: Hand;
	export let fight: Fight;
	export let passiveEffects: EffectInterface[];

	export let currentStateName: string;

	export let isEnemy: boolean = false;

	const dispatch = createEventDispatcher();
	let openedInventory: boolean = false;

	const endTurnStates: string[] = [
		'TurnWonState',
		'TurnTiedState',
		'TurnLostState',
		'TurnBustedState'
	];

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'top'
	};

	function openInventory() {
		openedInventory = !openedInventory;
	}
</script>

{#if openedInventory === true}
	<div
		class="absolute {isEnemy ? 'right-20' : 'left-20'} z-10 bg-surface-500/90"
		transition:fade={{ delay: 250, duration: 300 }}
	>
		<div class="flex flex-col items-center justify-center h-full w-full">
			<h1 class="h1 p-4">
				Inventory for {isEnemy ? 'enemy' : 'player'}
				<button class="btn" on:click={() => openInventory()}>
					<Icon icon="mdi:close" width="24" height="24" />
				</button>
			</h1>
			<div
				class="flex h-full flex-col flex-wrap items-center justify-center overscroll-none overflow-y-scroll pb-24"
			>
				{#each player.inventory as object}
					<div class="flex flex-row flex-wrap items-center justify-center space-y-4">
						<div class="card p-4 variant-filled-primary">
							<p>{object.name}</p>
							<p>{object.description}</p>
							<div class="arrow variant-filled-primary" />
						</div>
						<button class="btn" on:click={() => dispatch('triggerEffect', { object })}>
							<Icon icon={object.icon} width="64" height="64" />
						</button>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

<div class="flex flex-col items-center justify-center md:h-full w-full md:w-5/12">
	<div
		class="flex {isEnemy
			? 'flex-row-reverse'
			: 'flex-row'} flex-wrap items-center justify-start w-full space-x-5 min-h-16"
	>
		{#each passiveEffects as sideEffect}
			<div class="card p-4 variant-filled-primary" data-popup="popupClick">
				<p>{sideEffect.name}</p>
				<p>{sideEffect.description}</p>
				<div class="arrow variant-filled-primary" />
			</div>
			<button class="btn" use:popup={popupClick}>
				<Icon icon={sideEffect.icon} width="64" height="64" />
			</button>
		{/each}
	</div>
	<h3 class="h3 uppercase flex flex-row items-center justify-between">
		<span>{player.name}</span>
		<button class="btn" on:click={() => openInventory()}>
			<Icon icon="game-icons:backpack" width="64" height="64" />
		</button>
	</h3>
	<Healthbar
		currentHealth={player.currentHealth}
		maxHealth={player.maxHealth}
		healthColor={player.getHealthColor()}
	/>

	<div
		class="flex {isEnemy
			? 'flex-row-reverse'
			: 'flex-row'}  flex-wrap items-center justify-start w-full space-x-5 my-20"
	>
		<div class="flex flex-col items-center justify-center space-y-5 h-full w-4/12 md:w-2/12">
			<button
				on:click={() => dispatch('draw')}
				disabled={currentStateName !== 'TurnPlayingState'}
				type="button"
			>
				<Deck deckSize={player.deck.cards.length} />
			</button>

			<button
				on:click={() => dispatch(isEnemy ? 'enemyDiscardView' : 'playerDiscardView')}
				disabled={currentStateName !== 'TurnPlayingState'}
				type="button"
			>
				<Discard discardSize={player.discard.cards.length} />
			</button>
		</div>
		<div
			class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto w-1/2 md:w-9/12"
		>
			{#each [...playerHand.cards].reverse() as card}
				<PlayingCard {card} />
			{/each}
		</div>
		{#if endTurnStates.includes(currentStateName)}
			<div class="flex flex-row flex-wrap items-center justify-center w-full text-4xl text-red-500">
				{#if isEnemy}
					<p class="p">
						{playerHand.value}
						{fight.basePowerForEnemy !== 0 ? `+ ${fight.basePowerForEnemy}` : ''}
					</p>
				{:else}
					<p class="p">
						{playerHand.value}
						{fight.basePowerForPlayer !== 0 ? `+ ${fight.basePowerForPlayer}` : ''}
					</p>
				{/if}
				<Icon icon="game-icons:battle-axe" />
			</div>
		{/if}
	</div>
</div>
