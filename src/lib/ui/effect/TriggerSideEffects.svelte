<script lang="ts">
	import type {
		DamageTriggerEffectInterface,
		HealingTriggerEffectInterface
	} from '$lib/models/effect/interfaces';
	import { gameStore } from '$lib/stores/game';
	import Icon from '@iconify/svelte';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';

	export let triggerEffects: Array<HealingTriggerEffectInterface | DamageTriggerEffectInterface>;
	export let isEnemy: boolean;

	const dispatch = createEventDispatcher();

	function useEffect(effect: HealingTriggerEffectInterface | DamageTriggerEffectInterface) {
		effect.effect({ user: 'player' });
		gameStore.removeFromInventory(effect, 'player');

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
	<div class="card p-4 variant-filled-primary z-10" data-popup={triggerEffect.technicalName}>
		<p>{triggerEffect.name}</p>
		<p>{triggerEffect.description}</p>
		{#if isEnemy === false}
			<button class="btn" on:click={() => useEffect(triggerEffect)}>Use</button>
		{/if}
		<div class="arrow variant-filled-primary" />
	</div>
	<button class="btn" use:popup={popupClick(triggerEffect.technicalName)}>
		<Icon icon={triggerEffect.icon} width="64" height="64" />
	</button>
{/each}
