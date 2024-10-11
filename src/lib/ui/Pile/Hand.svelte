<script lang="ts">
	import PlayingCard from "../Card/PlayingCard.svelte";
    import type { Entity } from "$lib/ecs/entities";
	import type ActorObservableSystem from "$lib/ecs/systems/ActorObservableSystem/ActorObservableSystem";

	export let actorObservableSystem: ActorObservableSystem;
	export let actor: Entity;
</script>

<div class="inline-flex flex-row items-center justify-start w-1/2 md:w-8/12 mx-5">
    {#each actorObservableSystem.getHandFromActor(actor).cards as card}
        <PlayingCard {card} isEnemy={actorObservableSystem.isEnemy(actor)} />
    {/each}
</div>


