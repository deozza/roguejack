<script lang="ts">
	import type EffectInterface from "$lib/models/effect/effectInterface";
	import Icon from "@iconify/svelte";
	import { popup, type PopupSettings } from "@skeletonlabs/skeleton";

    export let sideEffect: EffectInterface;

    function popupClick(target: string): PopupSettings {
		return {
			event: 'click',
			target,
			placement: 'top'
		};
	}

    $: console.log(sideEffect);

</script>


<div class="card p-4 variant-filled-primary z-10" data-popup={sideEffect.technicalName}>
    <p>{sideEffect.name}</p>
    <p>{sideEffect.description}</p>
    <div class="arrow variant-filled-primary" />
</div>
<button class="btn {sideEffect.active !== undefined && sideEffect.active === true ? 'bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-100' : ''}" use:popup={popupClick(sideEffect.technicalName)}>
    <Icon icon={sideEffect.icon} width="64" height="64" />
</button>