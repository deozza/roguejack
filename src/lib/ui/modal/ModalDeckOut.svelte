<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	const modalStore = getModalStore();

	// Notes: Use `w-screen h-screen` to fit the visible canvas size.
	const cBase = 'bg-surface-100-800-token w-screen h-screen flex justify-center items-center';

	function redirectToHome() {
		goto('/');
		parent.onClose();
	}
</script>

{#if $modalStore[0]}
	<div class=" {cBase}">
		<div class="flex flex-col items-center space-y-4">
			<h2 class="h2">You lose</h2>
			<p>There was no cards left to draw.</p>
			<button class="btn variant-filled" on:click={redirectToHome}>Go back to home screen</button>
		</div>
	</div>
{/if}
