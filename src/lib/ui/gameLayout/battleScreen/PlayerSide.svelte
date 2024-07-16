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

	export let playerName: string;
	export let currentHealth: number;
	export let maxHealth: number;
	export let healthColor: string;
	export let playerHand: Hand;
	export let deckSize: number;
	export let discardSize: number;
	export let fight: Fight;
	export let sideEffects: EffectInterface[];

	export let currentStateName: string;

	export let isEnemy: boolean = false;

	const dispatch = createEventDispatcher();

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
</script>

<div class="flex flex-col items-center justify-center md:h-full w-full md:w-5/12">
	<div
		class="flex {isEnemy
			? 'flex-row-reverse'
			: 'flex-row'} flex-wrap items-center justify-start w-full space-x-5 min-h-16"
	>
		{#each sideEffects as sideEffect}
			<div class="card p-4 variant-filled-primary" data-popup="popupClick">
				<p>{sideEffect.name}</p>
				<p>{sideEffect.description}</p>
				<div class="arrow variant-filled-primary" />
			</div>
			<button class="btn" use:popup={popupClick}>
				<Icon icon="{sideEffect.icon}" width="64" height="64" />
			</button>
		{/each}
	</div>
	<h3 class="h3 uppercase">
		{playerName}
	</h3>
	<Healthbar {currentHealth} {maxHealth} {healthColor} />

	<div
		class="flex {isEnemy
			? 'flex-row-reverse'
			: 'flex-row'}  flex-wrap items-center justify-start w-full space-x-5 my-20"
	>
		<div class="flex flex-col items-center justify-center space-y-5 h-full w-4/12 md:w-2/12">
			<button on:click={() => dispatch('draw')} disabled={currentStateName !== 'TurnPlayingState'} type="button">
				<Deck {deckSize} />
			</button>

			<button on:click={() => dispatch(isEnemy ? 'enemyDiscardView' : 'playerDiscardView')} disabled={currentStateName !== 'TurnPlayingState'} type="button">
				<Discard {discardSize} />
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
