<script lang="ts">
	import { gameStore } from '$lib/stores/game';
	import { battleMachineState } from '$lib/stores/stateMachine/battle';
	import Deck from '$lib/ui/deck/Deck.svelte';
	import Discard from '$lib/ui/deck/Discard.svelte';
	import Armor from '$lib/ui/effect/Armor.svelte';
	import Item from '$lib/ui/effect/Item.svelte';
	import PassiveAbility from '$lib/ui/effect/PassiveAbility.svelte';
	import Status from '$lib/ui/effect/Status.svelte';
	import { updateBattleState } from '$lib/utils';
	import Icon from '@iconify/svelte';
</script>

<div class="flex flex-row items-center justify-around divide-x divide-surface-500">
	<p class="flex flex-row items-center justify-center text-error-500">
		<Icon icon="game-icons:hearts" width="16" height="16" />
		{$gameStore.player.currentHealth}/{$gameStore.player.maxHealth}
	</p>

	{#if $battleMachineState.currentState.name === 'BattleCampingState' || $battleMachineState.currentState.name === 'BattleShopingState'}
		<Deck deckSize={$gameStore.player.deck.cards.length} mini={true} />
		<Discard discardSize={$gameStore.player.discard.cards.length} mini={true} />
	{/if}

	<div class="flex flex-row items-center justify-start space-x-3">
		{#each $gameStore.player.passiveAbilities as passiveAbility}
			<PassiveAbility {passiveAbility} />
		{/each}
	</div>

	{#if $gameStore.player.status.length > 0}
		<div class="flex flex-row items-center justify-start space-x-3">
			{#each $gameStore.player.status as status}
				<Status {status} />
			{/each}
		</div>
	{/if}

	<div class="flex flex-row items-center justify-start space-x-3">
		{#each $gameStore.player.inventory as item}
			<Item {item} isEnemy={false} on:updateBattleState={async () => await updateBattleState()} />
		{/each}
	</div>

	<div class="flex flex-row items-center justify-start space-x-3">
		{#each $gameStore.player.armors as armor}
			<Armor {armor} />
		{/each}
	</div>
</div>
