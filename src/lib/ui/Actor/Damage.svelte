<script lang="ts">
	import { fade, fly } from "svelte/transition";
    import type { Entity } from "$lib/ecs/entities";
	import type ActorObservableSystem from "$lib/ecs/systems/ActorObservableSystem/ActorObservableSystem";

    export let actor: Entity;
    export let actorObsverbaleSystem: ActorObservableSystem;
</script>


{#if actorObsverbaleSystem.hasActorBeenDamaged(actor)}
    <p in:fly={{ y: 10, duration: 2000 }} out:fade class="h3 text-red-500">- {actorObsverbaleSystem.getActorDamage(actor).damage}</p>
{/if}