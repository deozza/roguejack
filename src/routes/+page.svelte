<script lang="ts">
	import { Character } from '$lib/stores/character/model';
	import { Game } from '$lib/stores/game/model';
	import { gameState } from '$lib/stores/game';
	import { Deck } from '$lib/stores/deck/model';
	import { Battle } from '$lib/stores/battle/model';
	import { Turn } from '$lib/stores/turn/model';

	function startNewGame() {

		const deck: Deck = new Deck();
		deck.generateDeck(['clubs', 'diamonds', 'hearts', 'spades'], ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']);
		deck.shuffleDeck();

		const player: Character = new Character();
		player.generateCharacter();
		player.deck = deck;

		const game: Game = new Game();
		game.player = player;

		$gameState = game;
	}

	function startNewBattle() {
		const deck: Deck = new Deck();
		deck.generateDeck(['clubs', 'diamonds', 'hearts', 'spades'], ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']);
		deck.shuffleDeck();

		const enemy: Character = new Character();
		enemy.generateCharacter();
		enemy.deck = deck;
		const battle: Battle = new Battle(enemy, $gameState!.battles.length);
		$gameState?.addBattle(battle);

		$gameState = $gameState;
	}

	function startNewTurn() {
		const turn: Turn = new Turn($gameState!.getCurrentBattle()!.turns.length);
		$gameState?.getCurrentBattle()?.addTurn(turn);
		$gameState = $gameState;
	}

	function draw() {
		const card = $gameState?.player.deck?.drawTopCard();
		$gameState = $gameState;

		if (card) {
			$gameState?.getCurrentBattle()?.getCurrentTurn()?.playerHand.addCard(card);
			$gameState = $gameState;
		}
	}

	$: console.log('game', $gameState);
	$: console.log('battle', $gameState?.getCurrentBattle());
	$: console.log('turn', $gameState?.getCurrentBattle()?.getCurrentTurn());
	$: console.log('deck', $gameState?.player.deck);
	$: console.log('hand', $gameState?.getCurrentBattle()?.getCurrentTurn()?.playerHand);
</script>

<button class="btn btn-xl variant-filled-success" on:click={startNewGame}> New game </button>
<button class="btn btn-xl variant-filled-success" on:click={startNewBattle}> New Battle </button>
<button class="btn btn-xl variant-filled-success" on:click={startNewTurn}> New Turn </button>

<button class="btn btn-xl variant-filled-success" on:click={draw}> Draw </button>


