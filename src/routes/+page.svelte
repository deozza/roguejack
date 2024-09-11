<script lang="ts">
	import AttackComponent from "$lib/ecs/components/ActorComponents/AttackComponent";
	import DeckComponent from "$lib/ecs/components/ActorComponents/DeckComponent";
	import DiscardableCardComponent from "$lib/ecs/components/ActorComponents/DiscardableCardComponent";
	import DiscardComponent from "$lib/ecs/components/ActorComponents/DiscardComponent";
	import DrawFlag from "$lib/ecs/components/ActorComponents/DrawFlag";
	import EnemyComponent from "$lib/ecs/components/ActorComponents/EnemyComponent";
	import FightFlag from "$lib/ecs/components/ActorComponents/FightFlag";
	import HandComponent from "$lib/ecs/components/ActorComponents/HandComponent";
	import HealthComponent from "$lib/ecs/components/ActorComponents/HealthComponent";
	import type { Entity } from "$lib/ecs/entities";
	import { System } from "$lib/ecs/systems";
	import GameLoop from "$lib/game/GameLoop";
	import Card from "$lib/modeles/Card";
	import { SuitEnum, ValueEnum } from "$lib/modeles/Card";

	let gameLoop: GameLoop = new GameLoop();

	let player: Entity = gameLoop.addEntity();
	let enemy: Entity = gameLoop.addEntity();

	gameLoop.addComponent(enemy, new EnemyComponent("basic", 1, 12));

	const deck1: Card[] = [];
	for(const suit of Object.values(SuitEnum)) {
		for(const value of Object.values(ValueEnum)) {
			deck1.push(new Card(value, suit));
		}
	}

	deck1.sort(() => Math.random() - 0.5);

	const deck2: Card[] = [];
	for(const suit of Object.values(SuitEnum)) {
		for(const value of Object.values(ValueEnum)) {
			deck2.push(new Card(value, suit));
		}
	}

	deck2.sort(() => Math.random() - 0.5);

	gameLoop.addComponent(player, new DeckComponent(deck1));
	gameLoop.addComponent(enemy, new DeckComponent(deck2));

	gameLoop.addComponent(player, new HealthComponent(20))
	gameLoop.addComponent(enemy, new HealthComponent(20))

	gameLoop.addComponent(player, new HandComponent([]));
	gameLoop.addComponent(enemy, new HandComponent([]));

	gameLoop.addComponent(player, new DiscardComponent([]));
	gameLoop.addComponent(enemy, new DiscardComponent([]));

	gameLoop.addComponent(player, new AttackComponent());
	gameLoop.addComponent(enemy, new AttackComponent());

	gameLoop.addSystem(System.Health);
	gameLoop.addSystem(System.Draw);
	gameLoop.addSystem(System.Discard);
	gameLoop.addSystem(System.ActorObservable);
	gameLoop.addSystem(System.Attack);
	gameLoop.addSystem(System.Fight);

	setInterval(() => {
		gameLoop.update();
		gameLoop = gameLoop;
	}, 16);

	function drawCard() {
		gameLoop.addComponent(player, new DrawFlag());
	}

	function fight() {
		gameLoop.addComponent(player, new FightFlag());
		gameLoop.update();


		while(gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(enemy, AttackComponent)?.attack <= gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(enemy, EnemyComponent)?.minAttack) {
			gameLoop.addComponent(enemy, new DrawFlag());
			gameLoop.update();
		}

		gameLoop.addComponent(enemy, new FightFlag());
		gameLoop.update();
	}

	function nextTurn() {

		while(gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(player, HandComponent)?.cards.length > 0) {
            gameLoop.addComponent(player, new DiscardableCardComponent(gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(player, HandComponent)?.cards[0]));
            gameLoop.update();
        }

		while(gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(enemy, HandComponent)?.cards.length > 0) {
            gameLoop.addComponent(enemy, new DiscardableCardComponent(gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(enemy, HandComponent)?.cards[0]));
            gameLoop.update();
        }
	}

</script>

<svelte:head>
	<title>Dungeons and Jacks</title>
	<meta
		name="description"
		content="Dungeons and Jacks is a game mixing blackjack and roguelite elements. Use your deck to build powerful hands, take advantage from the abilities of your characters and the weapons you collect through your journey and try to destroy your enemies."
	/>
	<meta
		name="keywords"
		content="game,rogue,card,blackjack,dungeons,jacks,dungeons and jacks,roguelite,roguelike,deck,deck building,deckbuilding,free"
	/>
</svelte:head>

<div class="w-full flex flex-row items-center justify-between">
	<div>
		<p>Player</p>
		<p>Health: {gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(player, HealthComponent)?.currentHealth}</p>
		{#each gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(player, HandComponent)?.cards as card}
			<p>{card.value} of {card.suit}</p>
		{/each}

		<p>deck : {gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(player, DeckComponent)?.cards.length}</p>
		<p>discard : {gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(player, DiscardComponent)?.cards.length}</p>
		
		<p>power : {gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(player, AttackComponent)?.attack}</p>

		<button on:click={() => drawCard()}>Draw</button>
		<button on:click={() => fight()}>fight</button>
		<button on:click={() => nextTurn()}>next turn</button>
		
	</div>
	<div>
		<p>Enemy</p>
		<p>Health: {gameLoop.getSystem(System.Health)?.getComponentFromEntity(enemy, HealthComponent)?.currentHealth}</p>
		{#each gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(enemy, HandComponent)?.cards as card}
			<p>{card.value} of {card.suit}</p>
		{/each}
		<p>deck : {gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(enemy, DeckComponent)?.cards.length}</p>
		<p>discard : {gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(enemy, DiscardComponent)?.cards.length}</p>

	</div>
</div>