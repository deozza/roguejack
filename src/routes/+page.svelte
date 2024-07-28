<script lang="ts">
	import { goto } from '$app/navigation';
	import { BattleMachineState } from '$lib/models/stateMachine/battle/battleMachineState';
	import { TurnMachineState } from '$lib/models/stateMachine/turn/turnMachineState';
	import { gameStore } from '$lib/stores/game';
	import { sceneStore } from '$lib/stores/scene';
	import { battleMachineState } from '$lib/stores/stateMachine/battle';
	import { gameMachineState } from '$lib/stores/stateMachine/game';
	import { turnMachineState } from '$lib/stores/stateMachine/turn';
	import { fade } from 'svelte/transition';

	function quit() {
		$gameMachineState = $gameMachineState.listenToEvent({ name: 'QUIT_GAME', data: null });
		battleMachineState.set(new BattleMachineState())
		turnMachineState.set(new TurnMachineState());

		gameStore.reset();
	}

	function enterPause() {
		pauseStatus = !pauseStatus;
		if (pauseStatus === true) {
			pauseIcon = 'game-icons:play-button';
			$gameMachineState = $gameMachineState.listenToEvent({ name: 'PAUSE_GAME', data: null });
			return;
		}
		$gameMachineState = $gameMachineState.listenToEvent({ name: 'RESUME_GAME', data: null });

		pauseIcon = 'game-icons:pause-button';
	}
</script>

{#key $sceneStore}
	<div id="top" class="w-full h-full" in:fade>
		<svelte:component this={$sceneStore} on:resume={() => enterPause()} on:quit={() => quit()} />
	</div>	
{/key}
