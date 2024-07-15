<script lang="ts">
    import { gameStore } from '$lib/stores/game';
	import PlayerSide from '../battleScreen/PlayerSide.svelte';
    import { playerTurnMachineState } from '$lib/stores/stateMachine/turn';
    import { enemyTurnMachineState } from '$lib/stores/stateMachine/turn';
	import { battleMachineState } from '$lib/stores/stateMachine/battle';
	import { gameMachineState } from '$lib/stores/stateMachine/game';
	import { TurnDeckEmptyState } from '$lib/models/stateMachine/turn/states/turnDeckEmptyState';
	import CenterSide from '../battleScreen/CenterSide.svelte';
	import { TurnPlayingState } from '$lib/models/stateMachine/turn/states/turnPlayingState';
	import { TurnInitState } from '$lib/models/stateMachine/turn/states/turnInitState';

	function drawCard() {
		$playerTurnMachineState.listenToEvent({ name: 'DRAW', data: null });
		$playerTurnMachineState = $playerTurnMachineState;

		try {
			$playerTurnMachineState.currentState.onStateExecute({'user': 'player'});
		}catch(e: any) {
			if(e.message === 'PLAYER_EMPTY_DECK') {
				$playerTurnMachineState.listenToEvent({ name: 'DECK_EMPTY', data: null });
				$playerTurnMachineState = $playerTurnMachineState;

				updateBattleState();
			}
		}

		if($gameStore.getCurrentBattle()?.getCurrentTurn().playerHand.getIsBusted() === true) {
			$playerTurnMachineState.listenToEvent({ name: 'BUST', data: null });
			$playerTurnMachineState = $playerTurnMachineState;
			$playerTurnMachineState.currentState.onStateExecute({'user': 'player'});

			updateBattleState();

			return;
		}

		$playerTurnMachineState.listenToEvent({ name: 'PLAY', data: null });
		$playerTurnMachineState = $playerTurnMachineState;
	}

	function fight() {
		$playerTurnMachineState.listenToEvent({ name: 'FIGHT', data: null });
		$playerTurnMachineState = $playerTurnMachineState;

		$enemyTurnMachineState.listenToEvent({ name: 'DRAW', data: null });
		$enemyTurnMachineState = $enemyTurnMachineState;

		try {
			$enemyTurnMachineState.currentState.onStateExecute({'user': 'enemy'});
		}catch(e: any) {
			if(e.message === 'ENEMY_EMPTY_DECK') {
				$enemyTurnMachineState.listenToEvent({ name: 'DECK_EMPTY', data: null });
				$enemyTurnMachineState = $enemyTurnMachineState;

				$playerTurnMachineState.listenToEvent({ name: 'WIN', data: null });
				$playerTurnMachineState = $playerTurnMachineState;

				updateBattleState();
			}

			return;
		}

		if($gameStore.getCurrentBattle()?.getCurrentTurn().enemyHand.getIsBusted() === true) {
			$enemyTurnMachineState.listenToEvent({ name: 'BUST', data: null });
			$enemyTurnMachineState = $enemyTurnMachineState;
			$enemyTurnMachineState.currentState.onStateExecute({'user': 'enemy'});

			$playerTurnMachineState.listenToEvent({ name: 'WIN', data: null });
			$playerTurnMachineState = $playerTurnMachineState;

			updateBattleState();

			return;
		}

		$enemyTurnMachineState.listenToEvent({ name: 'PLAY', data: null });
		$enemyTurnMachineState = $enemyTurnMachineState;

		$enemyTurnMachineState.listenToEvent({ name: 'FIGHT', data: null });
		$enemyTurnMachineState = $enemyTurnMachineState;

		calculateAndApplyDamages();
	}

	function calculateAndApplyDamages() {
		const playerHandValue = $gameStore.getCurrentBattle()?.getCurrentTurn().playerHand.getValue();
		const enemyHandValue = $gameStore.getCurrentBattle()?.getCurrentTurn().enemyHand.getValue();

		if(playerHandValue === enemyHandValue) {
			$playerTurnMachineState.listenToEvent({ name: 'TIE', data: null });
			$playerTurnMachineState = $playerTurnMachineState;

			$enemyTurnMachineState.listenToEvent({ name: 'TIE', data: null });
			$enemyTurnMachineState = $enemyTurnMachineState;

			return;
		}

		if(playerHandValue > enemyHandValue) {
			$playerTurnMachineState.listenToEvent({ name: 'WIN', data: null });
			$playerTurnMachineState = $playerTurnMachineState;

			$enemyTurnMachineState.listenToEvent({ name: 'LOSE', data: null });
			$enemyTurnMachineState = $enemyTurnMachineState;

			let damage: number = playerHandValue - enemyHandValue;
			if($gameStore.getCurrentBattle()?.getCurrentTurn().playerHand.getIsBlackjack() === true) {
				damage = damage * 2;
			}

			gameStore.inflictDamagesToEnemy(damage);
		}

		if(playerHandValue < enemyHandValue) {
			$playerTurnMachineState.listenToEvent({ name: 'LOSE', data: null });
			$playerTurnMachineState = $playerTurnMachineState;

			$enemyTurnMachineState.listenToEvent({ name: 'WIN', data: null });
			$enemyTurnMachineState = $enemyTurnMachineState;

			let damage: number = enemyHandValue - playerHandValue;
			if($gameStore.getCurrentBattle()?.getCurrentTurn().enemyHand.getIsBlackjack() === true) {
				damage = damage * 2;
			}

			gameStore.inflictDamagesToPlayer(damage);
		}

		updateBattleState();
	}

	function newTurn() {
		gameStore.endTurn();
		$playerTurnMachineState.listenToEvent({ name: 'NEW_TURN', data: null });
		$playerTurnMachineState = $playerTurnMachineState;
		$playerTurnMachineState.currentState.onStateExecute({'user': 'player'});

		$playerTurnMachineState.listenToEvent({ name: 'PLAY', data: null });
		$playerTurnMachineState = $playerTurnMachineState;
		$playerTurnMachineState.currentState.onStateExecute({'user': 'player'});

	}

	function updateBattleState() {
		if($enemyTurnMachineState.currentState.name === TurnDeckEmptyState.name) {
			$playerTurnMachineState.listenToEvent({ name: 'WIN', data: null });
			$playerTurnMachineState = $playerTurnMachineState;

			$battleMachineState.listenToEvent({ name: 'WIN', data: null });
			$battleMachineState = $battleMachineState;

			return ;
		}

		if($playerTurnMachineState.currentState.name === TurnDeckEmptyState.name) {
			$playerTurnMachineState.listenToEvent({ name: 'LOSE', data: null });
			$playerTurnMachineState = $playerTurnMachineState;

			$battleMachineState.listenToEvent({ name: 'LOSE', data: null });
			$battleMachineState = $battleMachineState;

			return ;
		}

		if($gameStore.getCurrentBattle()?.enemy.currentHealth <= 0) {
			$battleMachineState.listenToEvent({ name: 'WIN', data: null });
			$battleMachineState = $battleMachineState;
			return;
		}

		if($gameStore.player.currentHealth <= 0) {
			$battleMachineState.listenToEvent({ name: 'LOSE', data: null });
			$battleMachineState = $battleMachineState;

			$gameMachineState.listenToEvent({ name: 'END_GAME', data: null });
			$gameMachineState = $gameMachineState;

			return;
		}
	}
    
</script>


<section class="container h-full mx-auto flex flex-col justify-left items-start space-y-10" id="battle-screen">
	<div class="flex flex-col items-center justify-center w-full">
		<h1 class="h1">Battle {$gameStore?.battles.length}</h1>
	</div>

	<div class="flex flex-col items-center justify-center w-full">
		<h2 class="h2">Turn {$gameStore?.getCurrentBattle()?.turns.length}</h2>
	</div>

	<div class="flex flex-row flex-wrap items-center justify-between w-full">
		<PlayerSide
			playerName={$gameStore.player.name}
			currentHealth={$gameStore.player.currentHealth}
			maxHealth={$gameStore.player.maxHealth}
			healthColor={$gameStore.player.getHealthColor()}
			playerHand={$gameStore.getCurrentBattle().getCurrentTurn().playerHand}
			deckSize={$gameStore.player.deck.cards.length}
			discardSize={$gameStore.player.discard.cards.length}
			currentStateName={$playerTurnMachineState.currentState.name}
			on:click={() => drawCard()}
		/>

		<div class="flex flex-col items-center justify-center w-full md:w-2/12">
			<CenterSide on:fight={() => fight()} on:camp={() => camp()} on:newTurn={() => newTurn()}/>
		</div>

		<PlayerSide
			playerName={$gameStore.getCurrentBattle().enemy.name}
			currentHealth={$gameStore.getCurrentBattle().enemy.currentHealth}
			maxHealth={$gameStore.getCurrentBattle().enemy.maxHealth}
			healthColor={$gameStore.getCurrentBattle().enemy.getHealthColor()}
			playerHand={$gameStore.getCurrentBattle().getCurrentTurn().enemyHand}
			deckSize={$gameStore.getCurrentBattle().enemy.deck.cards.length}
			discardSize={$gameStore.getCurrentBattle().enemy.discard.cards.length}
			currentStateName={$enemyTurnMachineState.currentState.name}
			isEnemy={true}
		/>
	</div>

</section>
