<script lang="ts">
	import Icon from '@iconify/svelte';
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import { storePopup } from '@skeletonlabs/skeleton';
	import PauseScreen from '$lib/ui/gameLayout/screens/PauseScreen.svelte';
	import { gameMachineState } from '$lib/stores/stateMachine/game';
	import { gameStore } from '$lib/stores/game';
	import { turnMachineState } from '$lib/stores/stateMachine/turn';
	import { TurnMachineState } from '$lib/models/stateMachine/turn/turnMachineState';
	import { battleMachineState } from '$lib/stores/stateMachine/battle';
	import { BattleMachineState } from '$lib/models/stateMachine/battle/battleMachineState';
	import PassiveAbility from '$lib/ui/effect/PassiveAbility.svelte';
	import Status from '$lib/ui/effect/Status.svelte';
	import Item from '$lib/ui/effect/Item.svelte';
	import Deck from '$lib/ui/deck/Deck.svelte';
	import Discard from '$lib/ui/deck/Discard.svelte';
	import { updateBattleState } from '$lib/utils';
	import PlayerInfos from '$lib/ui/gameLayout/navbar/PlayerInfos.svelte';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	let pauseIcon: string = 'game-icons:pause-button';
	let pauseStatus: boolean = false;

	function enterPause() {
		pauseStatus = !pauseStatus;
		if (pauseStatus === true) {
			pauseIcon = 'game-icons:play-button';
			return;
		}

		pauseIcon = 'game-icons:pause-button';
	}

	function quit() {
		$gameMachineState = $gameMachineState.listenToEvent({ name: 'QUIT_GAME', data: null });
		turnMachineState.set(new TurnMachineState());
		battleMachineState.set(new BattleMachineState());

		gameStore.reset();

		enterPause();
	}
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar padding="p-1 md:p-4">
			<svelte:fragment slot="lead">
				{#if $gameMachineState.currentState.name === 'GamePlayingState'}
					<PlayerInfos />
				{:else}
					<strong class="text-xl uppercase">Dungeons and Jacks</strong>
				{/if}
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<span>v0.10.0</span>
				<button class="btn" on:click={() => enterPause()}>
					<Icon icon={pauseIcon} width="32" height="32" />
				</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	{#if pauseStatus === true}
		<PauseScreen on:resume={() => enterPause()} on:quit={() => quit()} />
	{/if}
	<slot />
</AppShell>
