<script lang="ts">
	import type { ContinuousEffect } from '$lib/models/effects/interfaces';
	import Icon from '@iconify/svelte';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	export let passiveAbility: ContinuousEffect;

	function popupClick(target: string): PopupSettings {
		return {
			event: 'click',
			target,
			placement: 'top'
		};
	}
</script>

<div
	class="card p-4 variant-filled-primary z-10 max-w-48"
	data-popup={passiveAbility.technicalName}
>
	<p class="bold text-lg">{passiveAbility.name}</p>
	<p class="p">{passiveAbility.description}</p>
	<div class="arrow variant-filled-primary" />
</div>
<button class="" use:popup={popupClick(passiveAbility.technicalName)}>
	<Icon icon={passiveAbility.icon} width="32" height="32" />
</button>
