<script lang="ts">
	import type { ArmorInterface } from '$lib/models/items/interfaces';
	import Icon from '@iconify/svelte';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	export let armor: ArmorInterface;

	function popupClick(target: string): PopupSettings {
		return {
			event: 'click',
			target,
			placement: 'top'
		};
	}
</script>

<div class="card p-4 variant-filled-primary z-10 max-w-48" data-popup={armor.technicalName}>
	<p class="bold text-lg text-center">{armor.name}</p>
	<p class="p">{armor.description}</p>
	<div class="arrow variant-filled-primary" />
</div>
<button class="flex flex-row items-end" use:popup={popupClick(armor.technicalName)}>
	<Icon icon={armor.icon} width="32" height="32" />
	<span class="">x{armor.currentAmount}</span>
</button>
