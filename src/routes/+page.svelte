<script lang="ts">
	import { Character } from '$lib/models/character/model';
	import { Game } from '$lib/models/game/model';
	import { gameState } from '$lib/stores/game';
	import { Battle } from '$lib/models/battle/model';
	import { Turn } from '$lib/models/turn/model';

	import necromancer from '$lib/models/character/players/necromancer.json';
	import rat from '$lib/models/character/enemies/rat.json';

	function startNewGame() {
		const player: Character = new Character();
		player.generateCharacter(necromancer);
		player.deck.shuffleDeck();

		const game: Game = new Game();
		game.player = player;

		$gameState = game;
	}

	function startNewBattle() {
		const enemy: Character = new Character();
		enemy.generateCharacter(rat);
		enemy.deck.shuffleDeck();

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


