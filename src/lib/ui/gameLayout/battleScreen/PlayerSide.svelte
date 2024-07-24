<script lang="ts">
	import type { Hand } from '$lib/models/hand/model';
	import Icon from '@iconify/svelte';
	import Deck from '../../deck/Deck.svelte';
	import Discard from '../../deck/Discard.svelte';
	import PlayingCard from '../../playingCard/PlayingCard.svelte';
	import Healthbar from '../../character/Healthbar.svelte';
	import { createEventDispatcher } from 'svelte';
	import { gameStore } from '$lib/stores/game';
	import CharacterPreview from './CharacterPreview.svelte';
	import type { Character } from '$lib/models/characters';
	import type { ContinuousEffect, Status } from '$lib/models/effects/interfaces';
	import { EnnemyType } from '$lib/models/characters/types';

	export let user: Character;
	export let userHand: Hand;
	export let passiveEffects: Array<Status | ContinuousEffect> = [];

	export let currentStateName: string;
	export let isEnemy: boolean = false;

	const dispatch = createEventDispatcher();
	let openedCharacterInfo: boolean = false;

	function openCharacterInfoScreen() {
		openedCharacterInfo = !openedCharacterInfo;
	}
</script>

{#if openedCharacterInfo}
	<CharacterPreview
		{user}
		{passiveEffects}
		{isEnemy}
		on:close={() => openCharacterInfoScreen()}
		on:updateBattleState={() => {openCharacterInfoScreen();dispatch('updateBattleState')}}
	/>
{/if}

<div class="flex flex-col items-center justify-center md:h-full w-full md:w-4/12">
	<h3
		class="h3 uppercase flex flex-col items-center justify-center"
		class:text-orange-500={isEnemy &&
			$gameStore.battles.length % 5 === 0 &&
			$gameStore.battles.length % 10 !== 0}
		class:text-red-500={isEnemy && $gameStore.battles.length % 10 === 0}
	>
		{#if isEnemy && user.type !== undefined && user.type !== null}
			{#if user.type === EnnemyType.miniboss }
				<Icon icon="game-icons:crown" width="24" height="24" />
			{/if}
			{#if user.type === EnnemyType.boss}
				<Icon icon="game-icons:burning-skull" width="24" height="24" />
			{/if}
		{/if}
		<div class="flex flex-row items-center justify-center space-x-4">
			<span>{user.name}</span>

			<button
				class="btn btn-sm rounded-full variant-ringed-tertiary text-white"
				on:click={() => openCharacterInfoScreen()}>?</button
			>
		</div>
	</h3>

	<Healthbar
		currentHealth={user.currentHealth}
		maxHealth={user.maxHealth}
		healthColor={user.getHealthColor()}
	/>

	<div class="flex flex-row items-center justify-center space-x-3 mt-5">
		{#each passiveEffects as sideEffect}
			<Icon
				icon={sideEffect.icon}
				width="24"
				height="24"
				class={sideEffect.active !== undefined && sideEffect.active === true
					? 'text-orange-500'
					: ''}
			/>
		{/each}
	</div>

	<div
		class="flex flex-row {isEnemy
			? 'md:flex-row-reverse'
			: ''}  flex-wrap items-center justify-start w-full"
	>
		<div class="flex flex-col items-center justify-center space-y-5 h-full w-4/12 md:w-2/12">
			<button
				on:click={() => dispatch('draw')}
				disabled={currentStateName !== 'TurnPlayerPlayingState'}
				type="button"
			>
				<Deck deckSize={user.deck.cards.length} />
			</button>

			<button
				on:click={() => dispatch(isEnemy ? 'enemyDiscardView' : 'playerDiscardView')}
				disabled={currentStateName !== 'TurnPlayerPlayingState'}
				type="button"
			>
				<Discard discardSize={user.discard.cards.length} />
			</button>
		</div>
		<div
			class="inline-flex {isEnemy
				? 'flex-row-reverse'
				: 'flex-row'} items-center justify-start w-1/2 md:w-8/12 mx-5"
		>
			{#each userHand.cards as card}
				<PlayingCard {card} {isEnemy} />
			{/each}
		</div>
	</div>
</div>
