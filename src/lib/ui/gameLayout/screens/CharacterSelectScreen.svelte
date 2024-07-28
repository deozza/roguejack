<script lang="ts">
	import { battleMachineState } from '$lib/stores/stateMachine/battle';
	import { gameMachineState } from '$lib/stores/stateMachine/game';
	import { turnMachineState } from '$lib/stores/stateMachine/turn';
	import Icon from '@iconify/svelte';
	import DeckPreview from '../battleScreen/DeckPreview.svelte';
	import { PlayerList, type Player } from '$lib/models/characters/players';

	let selectedCharacter: Player = PlayerList[0];
	let openedDeckPreview: boolean = false;

	function openDeckPreview() {
		openedDeckPreview = !openedDeckPreview;
	}

	function selectCharacter() {
		const player: Player = selectedCharacter;
		player.make();
		$gameMachineState = $gameMachineState.listenToEvent({
			name: 'CHARACTER_SELECTED',
			data: { character: player }
		});

		$gameMachineState = $gameMachineState.listenToEvent({ name: 'START_GAME', data: null });

		$battleMachineState = $battleMachineState.listenToEvent({ name: 'NEW_BATTLE', data: null });

		$battleMachineState = $battleMachineState.listenToEvent({ name: 'PLAY', data: null });

		$turnMachineState = $turnMachineState.listenToEvent({ name: 'NEW_TURN', data: null });

		$turnMachineState = $turnMachineState.listenToEvent({ name: 'PLAY', data: null });
	}
</script>

{#if openedDeckPreview}
	<DeckPreview cards={selectedCharacter.deck.cards} on:close={() => openDeckPreview()} />
{/if}

<section
	class="container h-full mx-auto flex flex-col justify-center items-center"
	id="character-select-screen"
>
	<div class="flex flex-col items-center justify-center h-full space-y-10 w-full">
		<h1 class="h1">Select your character</h1>
		<div class="flex flex-row items-center justify-around w-full">
			{#if selectedCharacter !== null}
				<div class="flex flex-col flex-wrap items-start justify-start space-y-8 w-1/3">
					<div class="flex flex-col flex-wrap items-start justify-start w-full space-y-4">
						<h2 class="h2">{selectedCharacter.name}</h2>
						<p class="flex flex-row items-center justify-center text-error-500">
							<Icon icon="game-icons:hearts" width="16" height="16" />
							{selectedCharacter.maxHealth}/{selectedCharacter.maxHealth}
						</p>
						<hr class="w-full" />
					</div>

					{#each selectedCharacter.passiveAbilities as passive}
						<div class="flex flex-col items-start justify-start space-y-4">
							<p class="p flex flex-row items-center">
								<Icon icon={passive.icon} height="32" width="32" />
								{passive.name}
							</p>
							<p class="p">{passive.description}</p>
						</div>
					{/each}
					<button class="btn variant-ringed-tertiary" on:click={() => openDeckPreview()}
						>See deck</button
					>
				</div>
				<button class="btn variant-filled-success rounded-md" on:click={() => selectCharacter()}>
					Confirm
				</button>
			{/if}
		</div>
		<div class="flex flex-row flex-wrap items-center justify-center w-full space-x-5">
			{#each PlayerList as player}
				<button
					class="btn {selectedCharacter.name === player.name
						? 'variant-filled-tertiary'
						: 'variant-ringed-tertiary'} rounded-md"
					on:click={() => (selectedCharacter = player)}
				>
					<Icon icon={player.icon} width="32" height="32" />
				</button>
			{/each}
		</div>
	</div>
</section>
