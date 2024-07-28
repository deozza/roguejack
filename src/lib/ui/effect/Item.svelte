<script lang="ts">
	import type { ItemTypes } from '$lib/models/items/types';
	import { turnMachineState } from '$lib/stores/stateMachine/turn';
	import Icon from '@iconify/svelte';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';
	import { playerUsingItemStore } from '$lib/stores/sideEffects';

	export let item: ItemTypes;
	export let isEnemy: boolean;

	const dispatch = createEventDispatcher();

	function useEffect(item: ItemTypes) {
		playerUsingItemStore.set(item);

		$turnMachineState = $turnMachineState.listenToEvent({ name: 'USE_ITEM', data: null });

		$turnMachineState = $turnMachineState.listenToEvent({ name: 'PLAY', data: null });

		dispatch('updateBattleState');
	}

	function popupClick(target: string): PopupSettings {
		return {
			event: 'click',
			target,
			placement: 'top'
		};
	}
</script>

<div class="card p-4 variant-filled-primary z-10 max-w-48" data-popup={item.technicalName}>
	<p class="bold text-lg">{item.name}</p>
	<p class="p">{item.description}</p>
	{#if isEnemy === false}
		<button
			class="btn"
			on:click={() => useEffect(item)}
			disabled={$turnMachineState.currentState.name !== 'TurnPlayerPlayingState'}>Use</button
		>
	{/if}
	<div class="arrow variant-filled-primary" />
</div>
<button class="flex flex-row items-end" use:popup={popupClick(item.technicalName)}>
	<Icon icon={item.icon} width="32" height="32" />
	<span class="">x{item.currentAmount}</span>
</button>
