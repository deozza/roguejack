<script lang="ts">
	import PassiveSideEffects from '$lib/ui/effect/PassiveSideEffects.svelte';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import TriggerSideEffects from '$lib/ui/effect/TriggerSideEffects.svelte';
	import type { Character } from '$lib/models/characters';

	const dispatch = createEventDispatcher();

	export let user: Character;
	export let passiveEffects = [];
	export let isEnemy: boolean = false;
</script>

<section
	class="absolute z-10 top-14 md:top-20 right-0 left-0 bg-surface-500/90 drop-shadow-2xl"
	transition:fade={{ delay: 250, duration: 300 }}
>
	<div class="flex flex-col items-center justify-center h-full w-full">
		<div class="flex flex-row items-center justify-end w-full p-4">
			<button class="btn" on:click={() => dispatch('close')}>
				<Icon icon="mdi:close" width="24" height="24" />
			</button>
		</div>

		<div class="flex flex-row items-center justify-center w-full mb-10">
			<h1 class="h1">
				Infos of {user.name}
			</h1>
		</div>

		<div class="flex flex-col items-center justify-center h-full my-10 w-full">
			<h3 class="h3 p-4">Passive effects</h3>
			<hr class="w-9/12 !border-slate-500 mb-10" />
			<div class="flex flex-row flex-wrap items-center justify-around w-full space-x-5 min-h-16">
				<PassiveSideEffects {passiveEffects} />
			</div>
		</div>

		<div class="flex flex-col items-center justify-center h-full w-full">
			<h3 class="h3 p-4">Inventory</h3>
			<hr class="w-9/12 !border-slate-500 mb-10" />
			<div
				class="flex h-full flex-col flex-wrap items-center justify-center overscroll-none overflow-y-scroll pb-24"
			>
				<TriggerSideEffects triggerEffects={user.inventory} {isEnemy} on:updateBattleState />
			</div>
		</div>
	</div>
</section>
