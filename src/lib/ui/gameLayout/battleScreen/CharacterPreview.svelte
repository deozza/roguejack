<script lang="ts">
	import type { Character } from "$lib/models/character/model";
	import PassiveSideEffects from "$lib/ui/effect/PassiveSideEffects.svelte";
	import Icon from "@iconify/svelte";
	import { createEventDispatcher } from "svelte";
	import { fade } from "svelte/transition";
	import type EffectInterface from '$lib/models/effect/effectInterface';
	import TriggerSideEffects from "$lib/ui/effect/TriggerSideEffects.svelte";

    const dispatch = createEventDispatcher();

    export let user: Character;
	export let passiveEffects: EffectInterface[];
    export let isEnemy: boolean = false;
</script>
<section
	class="absolute z-10 top-0 right-0 left-0 bg-surface-500/90 drop-shadow-2xl"
	transition:fade={{ delay: 250, duration: 300 }}
>
	<div class="flex flex-col items-center justify-center h-full w-full divide-y">
        <div class="flex flex-row items-center justify-around w-full">
            <div class="min-w-2/12"></div>
            <h3 class="h2 p-4 w-6/12">
                Info on {user.name}
            </h3>
            <button class="btn min-w-2/12" on:click={() => dispatch('close')}>
                <Icon icon="mdi:close" width="24" height="24" />
            </button>
        </div>

        <div class="flex flex-col items-center justify-center h-full w-full">
			<h3 class="h3 p-4">
				Passive effects
			</h3>
            <div
                class="flex flex-row flex-wrap items-center justify-around w-full space-x-5 min-h-16"
            >
                <PassiveSideEffects {passiveEffects} />
            </div>
        </div>


        <div class="flex flex-col items-center justify-center h-full w-full">
			<h3 class="h3 p-4">
				Inventory
			</h3>
			<div
				class="flex h-full flex-col flex-wrap items-center justify-center overscroll-none overflow-y-scroll pb-24"
			>
				<TriggerSideEffects triggerEffects={user.inventory} {isEnemy} on:updateBattleState />
			</div>
		</div>
	</div>
</section>