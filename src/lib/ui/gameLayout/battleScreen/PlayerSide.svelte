<script lang="ts">
	import type { Hand } from '$lib/models/hand/model';
	import Icon from '@iconify/svelte';
	import Deck from '../../deck/Deck.svelte';
	import Discard from '../../deck/Discard.svelte';
	import PlayingCard from '../../playingCard/PlayingCard.svelte';
	import Healthbar from '../../character/Healthbar.svelte';
	import { createEventDispatcher } from 'svelte';
	import { gameStore } from '$lib/stores/game';
	import { type CharacterInterface } from '$lib/models/characters';
	import { EnnemyType } from '$lib/models/characters/types';
	import BattlePower from './BattlePower.svelte';
	import type { Fight } from '$lib/models/fight/model';
	import PassiveAbility from '$lib/ui/effect/PassiveAbility.svelte';
	import Status from '$lib/ui/effect/Status.svelte';
	import { enemyHasAlreadyBeenDefeated } from '$lib/utils';
	import { Enemy } from '$lib/models/characters/enemies';
	import Armor from '$lib/ui/effect/Armor.svelte';

	export let user: CharacterInterface;
	export let userHand: Hand;
	export let currentStateName: string;
	export let fight: Fight;

	const isEnemy: boolean = user instanceof Enemy;

	$: estimatedValue = (): string | null => {
		if(isEnemy === false) {
			if(user.status.findIndex((status) => status.technicalName === 'blinded') !== -1) {
				return '?';
			}

			return null;
		}

		if(enemyHasAlreadyBeenDefeated(user)) {
			return user.minAttack + ' ?';
		}

		return '?'
	};

	$: shouldHideCard = (): boolean => {
		if(user.status.findIndex((status) => status.technicalName === 'blinded') !== -1) {
			return true;
		}

		return false;
	};

	const dispatch = createEventDispatcher();
</script>

<div class="flex flex-col items-center justify-center md:h-full w-full md:w-4/12">
	<div class="flex flex-col items-center justify-center w-1/2">
		<h3
			class="h3 uppercase flex flex-row flew-wrap items-center justify-center w-full"
			class:text-orange-500={isEnemy &&
				$gameStore.battles.length % 5 === 0 &&
				$gameStore.battles.length % 10 !== 0}
			class:text-red-500={isEnemy && $gameStore.battles.length % 10 === 0}
		>

			<div class="flex flex-col items-center justify-center">
				{#if isEnemy && user.type !== undefined && user.type !== null}
					{#if user.type === EnnemyType.miniboss}
						<Icon icon="game-icons:crown" width="24" height="24" />
					{/if}
					{#if user.type === EnnemyType.boss}
						<Icon icon="game-icons:burning-skull" width="24" height="24" />
					{/if}
				{/if}
				<span>{user.name}</span>
			</div>
		</h3>

		<Healthbar
			currentHealth={user.currentHealth}
			maxHealth={user.maxHealth}
			healthColor={user.getHealthColor()}
		/>

		<div class="flex flex-row items-center justify-between mt-5 w-full divide-x divide-surface-500">
			<div class="flex flex-row items-center justify-start space-x-3 w-1/2">
				{#each user.passiveAbilities as passiveAbility}
					<PassiveAbility {passiveAbility} />
				{/each}
			</div>

			{#if isEnemy }
				<div class="flex flex-row items-center justify-start space-x-3 w-1/2">
					{#each user.armors as armor}
						<Armor {armor} />
					{/each}
				</div>
			{/if}

			{#if user.status.length > 0}
				<div class="flex flex-row items-center justify-start space-x-3 w-1/2">
					{#each user.status as status}
						<Status {status} />
					{/each}
				</div>
			{/if}
		</div>
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
				<PlayingCard {card} {isEnemy} hidden={shouldHideCard()} />
			{/each}
		</div>
	</div>
	<BattlePower
		hand={userHand}
		damage={isEnemy ? fight.damageOfEnemy : fight.damageOfPlayer}
		{currentStateName}
		estimatedValue={estimatedValue()}
		hidden={shouldHideCard()}
	/>
</div>
