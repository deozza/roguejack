<script lang="ts">
	import type { Hand } from '$lib/models/hand/model';
	import Icon from '@iconify/svelte';
	import { fly } from 'svelte/transition';
	export let hand: Hand;
	export let bonusValue: number;
	export let bonusDamage: number;
	export let currentStateName: string;

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
			<p class="p" in:fly={{ delay: 300, duration: 800 }}>
				{hand.value + bonusValue}
				{bonusDamage !== 0 ? `+ ${bonusDamage}` : ''}
			</p>
		{/if}
		<Icon icon={iconByValue()} />
	</div>
{/key}
