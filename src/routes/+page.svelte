<script lang="ts">
	import HomeScreen from "$lib/ui/gameLayout/screens/HomeScreen.svelte";
	import { GameCharacterSelectionState, GameIdleState, GamePlayingState } from "$lib/models/stateMachine/game/states";
	import CharacterSelectScreen from "$lib/ui/gameLayout/screens/CharacterSelectScreen.svelte";
	import type { SvelteComponent } from "svelte";
	import { BattleCampingState, BattlePlayingState } from "$lib/models/stateMachine/battle/states";
	import BattleScreen from "$lib/ui/gameLayout/screens/BattleScreen.svelte";
	import { battleMachineState } from "$lib/stores/stateMachine/battle";
	import { gameMachineState } from "$lib/stores/stateMachine/game";
	import { gameStore } from "$lib/stores/game";
	import { enemyTurnMachineState, playerTurnMachineState } from "$lib/stores/stateMachine/turn";
	import CampScreen from "$lib/ui/gameLayout/screens/CampScreen.svelte";

	const screensToRender: Record<string, SvelteComponent> = {
		[GameIdleState.name]: HomeScreen,
		[GameCharacterSelectionState.name]: CharacterSelectScreen,
		[BattlePlayingState.name]: BattleScreen,
		[BattleCampingState.name]: CampScreen
	};

	function getSceenToRender(): SvelteComponent {

		if($gameMachineState.currentState && $gameMachineState.currentState.name !== GamePlayingState.name) {
			return screensToRender[$gameMachineState.currentState.name];
		}

		return screensToRender[$battleMachineState.currentState.name];
	}

	$: console.log('game : ', $gameStore);
	$: console.log('game state : ', $gameMachineState);
	$: console.log('battle state : ', $battleMachineState);
	$: console.log('player turn state : ', $playerTurnMachineState);
	$: console.log('enemy turn state : ', $enemyTurnMachineState);

	
</script>

<svelte:component this={getSceenToRender()} />