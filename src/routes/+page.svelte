<script lang="ts">
	import HomeScreen from '$lib/ui/gameLayout/screens/HomeScreen.svelte';
	import { GamePlayingState } from '$lib/models/stateMachine/game/states';
	import CharacterSelectScreen from '$lib/ui/gameLayout/screens/CharacterSelectScreen.svelte';
	import type { SvelteComponent } from 'svelte';
	import BattleScreen from '$lib/ui/gameLayout/screens/BattleScreen.svelte';
	import { battleMachineState } from '$lib/stores/stateMachine/battle';
	import { gameMachineState } from '$lib/stores/stateMachine/game';
	import CampScreen from '$lib/ui/gameLayout/screens/CampScreen.svelte';
	import GameLostScreen from '$lib/ui/gameLayout/screens/GameLostScreen.svelte';
	import ShopScreen from '$lib/ui/gameLayout/screens/ShopScreen.svelte';
	import type { BattleLostState, BattleWonState } from '$lib/models/stateMachine/battle/states';

	const screensToRender: Record<string, SvelteComponent> = {
		GameIdleState: HomeScreen,
		GameCharacterSelectionState: CharacterSelectScreen,
		BattlePlayingState: BattleScreen,
		BattleWonState: BattleScreen,
		BattleLostState: BattleScreen,
		BattleCampingState: CampScreen,
		BattleShopingState: ShopScreen,
		GameLostState: GameLostScreen
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
