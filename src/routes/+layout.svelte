<script lang="ts">
	import Icon from '@iconify/svelte';
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { gameMachineState } from '$lib/stores/stateMachine/game';
	import { fade } from 'svelte/transition';
	import { GamePausedState } from '$lib/models/stateMachine/game/states';

	function enterPause() {
		if($gameMachineState.currentState.name === 'GamePausedState') {
			$gameMachineState.listenToEvent({ name: 'RESUME_GAME', data: null });
			$gameMachineState = $gameMachineState;
			return;
		}
		$gameMachineState.listenToEvent({ name: 'PAUSE_GAME', data: null });
		$gameMachineState = $gameMachineState;
	}
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Roguejack</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<button class="btn" on:click={() => enterPause()}>
					<Icon icon="mdi:menu" />
				</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	{#if $gameMachineState.currentState.name === GamePausedState.name}
		<section
			class="absolute h-full w-full z-50 bg-surface-500/90"
			transition:fade={{ delay: 250, duration: 300 }}
		>
			<div class="flex flex-col items-center justify-center h-full w-full">
				<h1 class="h1">Pause</h1>
			</div>
		</section>
	{/if}
	<slot />
</AppShell>
