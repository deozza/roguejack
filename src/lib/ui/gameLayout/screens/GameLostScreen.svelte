<script>
	import { gameMachineState } from "$lib/stores/stateMachine/game";
	import { fade } from "svelte/transition";

    function quit() {
        $gameMachineState.listenToEvent({ name: 'QUIT_GAME', data: null });
        $gameMachineState = $gameMachineState;
    }

</script>

<section
	class="absolute h-full w-full z-50 bg-surface-500/90"
	transition:fade={{ delay: 250, duration: 300 }}
>
	<div class="flex flex-col items-center justify-center h-full w-full">
		<h1 class="h1">You lost</h1>
        <button class="btn" on:click={() => quit()}>Quit game</button>
	</div>
</section>
