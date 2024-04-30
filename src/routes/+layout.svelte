<script lang="ts">
	import ModalDeckOut from '$lib/ui/modal/ModalDeckOut.svelte';
	import ModalDied from '$lib/ui/modal/ModalDied.svelte';
	import '../app.postcss';
	import { AppShell, AppBar, Modal, initializeStores, type ModalComponent, Toast } from '@skeletonlabs/skeleton';

	initializeStores();

	const modalRegistry: Record<string, ModalComponent> = {
	// Set a unique modal ID, then pass the component reference
	modalDeckOut: { ref: ModalDeckOut },
	modalDied: { ref: ModalDied },

	// ...
};
</script>
<Toast />

<Modal components={modalRegistry}/>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Roguejack</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://discord.gg/EXqV7W8MtY"
					target="_blank"
					rel="noreferrer"
				>
					Discord
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://twitter.com/SkeletonUI"
					target="_blank"
					rel="noreferrer"
				>
					Twitter
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/skeletonlabs/skeleton"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<main class="container h-full mx-auto flex justify-center items-center">
		<div class="space-y-10 text-center flex flex-col items-center w-full">
			<slot />
		</div>
	</main>	
</AppShell>
