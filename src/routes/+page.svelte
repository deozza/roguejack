<script lang="ts">
	import HomeScreen from '$lib/ui/gameLayout/screens/HomeScreen.svelte';
	import { GamePlayingState } from '$lib/models/stateMachine/game/states';
	import CharacterSelectScreen from '$lib/ui/gameLayout/screens/CharacterSelectScreen.svelte';
	import type { SvelteComponent } from 'svelte';
	import BattleScreen from '$lib/ui/gameLayout/screens/BattleScreen.svelte';
	import { battleMachineState } from '$lib/stores/stateMachine/battle';
	import { gameMachineState } from '$lib/stores/stateMachine/game';
	import CampScreen from '$lib/ui/gameLayout/screens/CampScreen.svelte';

	const screensToRender: Record<string, SvelteComponent> = {
		GameIdleState: HomeScreen,
		GameCharacterSelectionState: CharacterSelectScreen,
		BattlePlayingState: BattleScreen,
		BattleCampingState: CampScreen
	};

	$: screenToRender = getScreenToRender(
		$gameMachineState.currentState,
		$battleMachineState.currentState
	);

	function getScreenToRender(gameCurrentState, battleCurrentState): SvelteComponent {
		if (gameCurrentState && gameCurrentState.name !== 'GamePlayingState') {
			return screensToRender[gameCurrentState.name];
		}

		return screensToRender[battleCurrentState.name];
	}
</script>

<svelte:component this={screenToRender} />
