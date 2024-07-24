<script lang="ts">
	import Icon from '@iconify/svelte';
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import { storePopup } from '@skeletonlabs/skeleton';
	import PauseScreen from '$lib/ui/gameLayout/screens/PauseScreen.svelte';
	import { gameMachineState } from '$lib/stores/stateMachine/game';
	import { gameStore } from '$lib/stores/game';
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
		$gameMachineState.listenToEvent({ name: 'QUIT_GAME', data: null });
		$gameMachineState = $gameMachineState;

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
				<strong class="text-xl uppercase">Dungeons and Jacks</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<span>v0.7.3</span>
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
