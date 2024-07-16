<script lang="ts">
	import Icon from '@iconify/svelte';
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { fade } from 'svelte/transition';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import { storePopup } from '@skeletonlabs/skeleton';
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
				<span>v0.3.0</span>
				<button class="btn" on:click={() => enterPause()}>
					<Icon icon={pauseIcon} width="32" height="32" />
				</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	{#if pauseStatus === true}
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
