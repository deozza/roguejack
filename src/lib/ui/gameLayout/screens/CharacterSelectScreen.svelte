<script lang="ts">
	import { characters } from '$lib/models/character/players';
	import type EffectInterface from '$lib/models/effect/effectInterface';
	import { TurnPlayingState } from '$lib/models/stateMachine/turn/states/turnPlayingState';
	import { gameStore } from '$lib/stores/game';
	import { playerSideEffectsStore } from '$lib/stores/sideEffects';
	import { battleMachineState } from '$lib/stores/stateMachine/battle';
	import { gameMachineState } from '$lib/stores/stateMachine/game';
	import { enemyTurnMachineState, playerTurnMachineState } from '$lib/stores/stateMachine/turn';
	import Icon from '@iconify/svelte';
	import { fade } from 'svelte/transition';
	import { sideEffects } from '$lib/models/effect';
	import PlayingCard from '$lib/ui/playingCard/PlayingCard.svelte';
	import { Card, type Face, type Suit } from '$lib/models/card/model';

	let selectedCharacter: object = {}
	let deck: Card[] = [];
	let passive: EffectInterface|null = null;
	let openedDeckPreview: boolean = false;
	
	preSelectCharacter(characters[0]);

	function preSelectCharacter(character: object) {
		selectedCharacter = character;
		passive = sideEffects[character.passive];
		deck = [];
		character.deck.suits.forEach((suit: Suit) => {
			character.deck.values.forEach((value: Face) => {
				deck = [...deck, new Card(suit, value )];
			});
		});
	}

	function openDeckPreview(){
		openedDeckPreview = !openedDeckPreview;
	}

	function selectCharacter() {
		$gameMachineState.currentState.onStateExecute({ selectedCharacter });

		$gameMachineState.listenToEvent({ name: 'CHARACTER_SELECTED', data: null });
		$gameMachineState = $gameMachineState;
		$gameMachineState.currentState.onStateExecute({});

		if ($gameStore.player.sideEffect !== null) {
			$playerSideEffectsStore = [...$playerSideEffectsStore, $gameStore.player.sideEffect];
		}

		$gameMachineState.listenToEvent({ name: 'START_GAME', data: null });
		$gameMachineState = $gameMachineState;

		$battleMachineState.listenToEvent({ name: 'NEW_BATTLE', data: null });
		$battleMachineState = $battleMachineState;
		$battleMachineState.currentState.onStateExecute({});

		$battleMachineState.listenToEvent({ name: 'PLAY', data: null });
		$battleMachineState = $battleMachineState;

		$playerTurnMachineState.listenToEvent({ name: 'NEW_TURN', data: null });
		$playerTurnMachineState = $playerTurnMachineState;
		$playerTurnMachineState.currentState.onStateExecute({ user: 'player' });

		$playerTurnMachineState.listenToEvent({ name: 'PLAY', data: null });
		$playerTurnMachineState = $playerTurnMachineState;
		$playerTurnMachineState.currentState.onStateExecute({ user: 'player' });

		enemyTurnMachineState.update((state) => {
			state.currentState = new TurnPlayingState();
			return state;
		});
	}
</script>

{#if openedDeckPreview}
	<section
		class="absolute h-full w-full z-10 bg-surface-500/90"
		transition:fade={{ delay: 250, duration: 300 }}
	>
		<div class="flex flex-col items-center justify-center h-full w-full">
			<h1 class="h1 p-4">
				Deck preview
				<button class="btn" on:click={() => openDeckPreview()}>
					<Icon icon="mdi:close" width="24" height="24" />
				</button>
			</h1>
			<div class="flex h-full flex-row flex-wrap items-center justify-center overscroll-none overflow-y-scroll pb-24">
				{#each deck as card}
					<PlayingCard {card} />
				{/each}

			</div>
		</div>
	</section>
{/if}

<section
	class="container h-full mx-auto flex flex-col justify-center items-center"
	id="character-select-screen"
	transition:fade={{ delay: 250, duration: 300 }}
>
	<div class="flex flex-col items-center justify-center h-full space-y-10 w-full">
		<h1 class="h1">Select your character</h1>
		<div class="flex flex-row items-center justify-between w-full">
			{#if selectedCharacter !== null}
				<div class="flex flex-col flex-wrap items-start justify-start">
					<h2 class="h2">{selectedCharacter.name}</h2>
					<p class="flex flex-row items-center justify-center text-error-500">
						<Icon icon="game-icons:hearts" width="16" height="16"/> {selectedCharacter.maxHealth}/{selectedCharacter.maxHealth}
					</p>
					<button class="btn" on:click={() => openDeckPreview()}>See deck</button>
					{#if passive !== undefined && passive !== null}
						<p class="text-sm w-8/12"><span class="text-lg">{passive.name}</span> : {passive.description}</p>
					{/if}
				</div>
				<button class="btn variant-filled-success rounded-md" on:click={() => selectCharacter()}>
					Confirm
				</button>
			{/if}
		</div>
		<div class="flex flex-row flex-wrap items-center justify-center w-full space-x-5">
			{#each characters as character}
				<button class="btn {selectedCharacter.name === character.name ? 'variant-filled-tertiary' : 'variant-ringed-tertiary' } rounded-md" on:click={() => preSelectCharacter(character)}>
					<Icon icon={character.icon} width="32" height="32" />
				</button>
			{/each}
		</div>
	</div>
</section>
