<script lang="ts">
	import type { Entity } from "$lib/ecs/entities";
	import type ActorObservableSystem from "$lib/ecs/systems/ActorObservableSystem/ActorObservableSystem";

	export let actorObservableSystem: ActorObservableSystem;
	export let actor: Entity;</script>

<div
	class="flex flex-col items-center justify-center rounded-xl card-hover bg-gradient-to-br from-gray-500 to-gray-800 h-32 w-24"
>
	<span class="'h4' font-semibold">
		{actorObservableSystem.getDiscardFromActor(actor).cards.length}
	</span>
</div>
