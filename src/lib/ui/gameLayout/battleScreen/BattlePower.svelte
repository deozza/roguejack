<script lang="ts">
	import type { Damage } from '$lib/models/damage/model';
	import type { Hand } from '$lib/models/hand/model';
	import Icon from '@iconify/svelte';
	import { fly } from 'svelte/transition';
	export let hand: Hand;
	export let damage: Damage;
	export let currentStateName: string;
	export let estimatedValue: string | null = null;

	const iconByValue = (): string => {
		if (currentStateName === 'TurnDeckEmptyState') {
			return 'game-icons:card-discard';
		}

		if (hand.getIsBusted()) {
			return 'game-icons:broken-axe';
		}

		if (hand.getIsBlackjack()) {
			return 'game-icons:magic-axe';
		}

		return 'game-icons:battle-axe';
	};
</script>

{#key hand.value}
	<div class="flex flex-row flex-wrap items-center justify-center m-4 text-4xl text-red-500">
		{#if currentStateName !== 'TurnDeckEmptyState'}
			{#if estimatedValue !== null && hand.value === 0}
				<p class="p">
					{ estimatedValue }
				</p>
			{:else}
				<p class="p" in:fly={{ delay: 300, duration: 800 }}>
					{hand.value + damage.bonusValue}
					{damage.bonusDamage !== 0 ? `+ ${damage.bonusDamage}` : ''}
				</p>

			{/if}
		{/if}
		<Icon icon={iconByValue()} />
	</div>
{/key}
