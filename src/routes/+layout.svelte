<script lang="ts">
	import ModalDeckOut from '$lib/ui/modal/ModalDeckOut.svelte';
	import ModalDied from '$lib/ui/modal/ModalDied.svelte';
	import '../app.postcss';
	import {
		AppShell,
		AppBar,
		Modal,
		initializeStores,
		type ModalComponent
	} from '@skeletonlabs/skeleton';

	initializeStores();

	const modalRegistry: Record<string, ModalComponent> = {
		// Set a unique modal ID, then pass the component reference
		modalDeckOut: { ref: ModalDeckOut },
		modalDied: { ref: ModalDied }

		// ...
	};
</script>

<Modal components={modalRegistry} />

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Roguejack</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail"></svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>
