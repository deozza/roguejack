<script>
	import { gameStore } from '$lib/stores/game';
	import { battleMachineState } from '$lib/stores/stateMachine/battle';
	import { gameMachineState } from '$lib/stores/stateMachine/game';
	import { turnMachineState } from '$lib/stores/stateMachine/turn';

	function quit() {
		$gameMachineState = $gameMachineState.listenToEvent({ name: 'QUIT_GAME', data: null });
		$battleMachineState = $battleMachineState.listenToEvent({ name: 'RESET', data: null });
		$turnMachineState = $turnMachineState.listenToEvent({ name: 'RESET', data: null });
		gameStore.reset();
	}
</script>

<section
	class="absolute h-full w-full z-50 bg-surface-500/90"
>
	<div class="flex flex-col items-center justify-center h-full w-full">
		<h1 class="h1">You lost</h1>
		<button class="btn" on:click={() => quit()}>Quit game</button>
	</div>
</section>
