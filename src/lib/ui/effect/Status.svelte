<script lang="ts">
	import type { Status } from '$lib/models/effects/interfaces';
	import Icon from '@iconify/svelte';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	export let status: Status;

	function popupClick(target: string): PopupSettings {
		return {
			event: 'click',
			target,
			placement: 'top'
		};
	}
</script>

<div class="card p-4 variant-filled-primary z-10 max-w-48" data-popup={status.technicalName}>
	<p class="bold text-lg">{status.name}</p>
	<p class="p">{status.description}</p>
	<div class="arrow variant-filled-primary" />
</div>
<button class="flex flex-row items-end" use:popup={popupClick(status.technicalName)}>
	<Icon icon={status.icon} width="32" height="32" />
	<span class="">x{status.currentAmount}</span>
</button>
