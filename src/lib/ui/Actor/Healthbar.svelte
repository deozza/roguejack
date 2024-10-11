<script lang="ts">
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { bounceOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import type { Entity } from "$lib/ecs/entities";
	import type ActorObservableSystem from "$lib/ecs/systems/ActorObservableSystem/ActorObservableSystem";

	export let actorObservableSystem: ActorObservableSystem;
	export let actor: Entity;
</script>

<div class="flex flex-col items-center justify-center w-full">
	<span class="text-2xl">{actorObservableSystem.getHealthFromActor(actor).currentHealth}/{actorObservableSystem.getHealthFromActor(actor).maxHealth}</span>
	{#key actorObservableSystem.getHealthFromActor(actor).currentHealth}
		<div class="w-full" in:fly={{ x: 50, duration: 200, easing: bounceOut, opacity: 1 }}>
			<ProgressBar value={actorObservableSystem.getHealthFromActor(actor).currentHealth} max={actorObservableSystem.getHealthFromActor(actor).maxHealth} meter={actorObservableSystem.getHealthColor(actor)} />
		</div>
	{/key}
</div>
