<script lang="ts">
	import type { ItemTypes } from '$lib/models/items/types';
	import { gameStore } from '$lib/stores/game';
	import { turnMachineState } from '$lib/stores/stateMachine/turn';
	import Icon from '@iconify/svelte';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';
	import { playerUsingItemStore } from '$lib/stores/sideEffects';

	export let triggerEffects: Array<ItemTypes>;
	export let isEnemy: boolean;

	const dispatch = createEventDispatcher();

	function useEffect(effect: ItemTypes) {
		playerUsingItemStore.set(effect);

		$turnMachineState = $turnMachineState.listenToEvent({ name: 'USE_ITEM', data: null })
		
		$turnMachineState = $turnMachineState.listenToEvent({ name: 'PLAY', data: null })

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

{#each triggerEffects as triggerEffect}
	<div class="card p-4 variant-filled-primary z-10 max-w-48" data-popup={triggerEffect.technicalName}>
		<p class="bold text-lg">{triggerEffect.name}</p>
		<p class="p">{triggerEffect.description}</p>
		{#if isEnemy === false}
			<button class="btn" on:click={() => useEffect(triggerEffect)} disabled={$turnMachineState.currentState.name!=='TurnPlayerPlayingState'}>Use</button>
		{/if}
		<div class="arrow variant-filled-primary" />
	</div>
	<button class="btn flex flex-row items-end" use:popup={popupClick(triggerEffect.technicalName)}>
		<Icon icon={triggerEffect.icon} width="64" height="64" />
		<span class="">x{triggerEffect.currentAmount}</span>
	</button>
{/each}
