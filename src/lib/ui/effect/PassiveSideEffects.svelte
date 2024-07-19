<script lang="ts">
	import type {PassiveEffectInterface} from "$lib/models/effect/interfaces";
	import Icon from "@iconify/svelte";
	import { popup, type PopupSettings } from "@skeletonlabs/skeleton";

    export let passiveEffects: PassiveEffectInterface[];

    function popupClick(target: string): PopupSettings {
		return {
			event: 'click',
			target,
			placement: 'top'
		};
	}
</script>

{#each passiveEffects as sideEffect}
	<div class="card p-4 variant-filled-primary z-10" data-popup={sideEffect.technicalName}>
		<p>{sideEffect.name}</p>
		<p>{sideEffect.description}</p>
		<div class="arrow variant-filled-primary" />
	</div>
	<button class="btn" use:popup={popupClick(sideEffect.technicalName)}>
		<Icon icon={sideEffect.icon} width="64" height="64" />
	</button>
{/each}
