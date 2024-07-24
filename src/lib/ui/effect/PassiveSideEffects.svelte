<script lang="ts">
	import type { ContinuousEffect, Status } from '$lib/models/effects/interfaces';
	import Icon from '@iconify/svelte';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	export let passiveEffects: Array<Status | ContinuousEffect> = [];

	function popupClick(target: string): PopupSettings {
		return {
			event: 'click',
			target,
			placement: 'top'
		};
	}
</script>

{#each passiveEffects as sideEffect}
	<div class="card p-4 variant-filled-primary z-10 max-w-48" data-popup={sideEffect.technicalName}>
		<p class="bold text-lg">{sideEffect.name}</p>
		<p class="p">{sideEffect.description}</p>
		<div class="arrow variant-filled-primary" />
	</div>
	<button class="btn" use:popup={popupClick(sideEffect.technicalName)}>
		<Icon icon={sideEffect.icon} width="64" height="64" />
	</button>
{/each}
