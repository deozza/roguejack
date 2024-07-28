<script lang="ts">
	import Icon from '@iconify/svelte';
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import { storePopup } from '@skeletonlabs/skeleton';
	import { gameMachineState } from '$lib/stores/stateMachine/game';
	import { gameStore } from '$lib/stores/game';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	let pauseIcon: string = 'game-icons:pause-button';
	let pauseStatus: boolean = false;

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

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar padding="p-1 md:p-4">
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Dungeons and Jacks</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<span>v0.7.4</span>
				{#if $gameMachineState.currentState.name === 'GamePlayingState' || $gameMachineState.currentState.name === 'GamePausedState'}
					<button class="btn" on:click={() => enterPause()}>
						<Icon icon={pauseIcon} width="32" height="32" />
					</button>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>
