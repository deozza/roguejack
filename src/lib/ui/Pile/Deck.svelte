<script lang="ts">
	import type { Entity } from "$lib/ecs/entities";
	import type ActorObservableSystem from "$lib/ecs/systems/ActorObservableSystem/ActorObservableSystem";

	export let actorObservableSystem: ActorObservableSystem;
	export let actor: Entity;
</script>

<div
	class="flex flex-col items-center justify-center rounded-xl card-hover bg-gradient-to-br from-primary-900 to-tertiary-900 h-32 w-24"
>
	<span class="'h4' font-semibold">
		{actorObservableSystem.getDeckFromActor(actor).cards.length}
	</span>
</div>
