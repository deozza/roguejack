<script lang="ts">
	import AttackComponent from "$lib/ecs/components/ActorComponents/AttackComponent";
	import DamageComponent from "$lib/ecs/components/ActorComponents/DamageComponent";
	import DeckComponent from "$lib/ecs/components/ActorComponents/DeckComponent";
	import DiscardableCardComponent from "$lib/ecs/components/ActorComponents/DiscardableCardComponent";
	import DiscardComponent from "$lib/ecs/components/ActorComponents/DiscardComponent";
	import DrawFlag from "$lib/ecs/components/ActorComponents/DrawFlag";
	import EnemyComponent from "$lib/ecs/components/ActorComponents/EnemyComponent";
	import FightFlag from "$lib/ecs/components/ActorComponents/FightFlag";
	import HandComponent from "$lib/ecs/components/ActorComponents/HandComponent";
	import HealthComponent from "$lib/ecs/components/ActorComponents/HealthComponent";
	import TurnFlag from "$lib/ecs/components/ActorComponents/TurnFlag";
	import type { Entity } from "$lib/ecs/entities";
	import { System } from "$lib/ecs/systems";
	import GameLoop from "$lib/game/GameLoop";
	import Card from "$lib/modeles/Card";
	import { SuitEnum, ValueEnum } from "$lib/modeles/Card";
	import Healthbar from "$lib/ui/Actor/Healthbar.svelte";
	import PlayingCard from "$lib/ui/Card/PlayingCard.svelte";
	import Deck from "$lib/ui/Pile/Deck.svelte";
	import Discard from "$lib/ui/Pile/Discard.svelte";
	import Hand from "$lib/ui/Pile/Hand.svelte";
	import { fade, fly } from "svelte/transition";

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

	gameLoop.addComponent(player, new TurnFlag());

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

	async function fight() {
		gameLoop.removeComponent(player, TurnFlag);
		gameLoop.update();

		gameLoop.addComponent(player, new FightFlag());
		gameLoop.update();

		gameLoop.addComponent(enemy, new TurnFlag());
		gameLoop.update();

		enemyAutoDraw();
	}

	function enemyAutoDraw() {
		let intervalId = setInterval(function(){
			gameLoop.addComponent(enemy, new DrawFlag());
			gameLoop.update();
			if (gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(enemy, AttackComponent)?.attack >= gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(enemy, EnemyComponent)?.minAttack) {
				clearInterval(intervalId)
				fightEngage();
				fightResolve();
			}
		}, 500);
	}

	function fightEngage() {
		gameLoop.removeComponent(enemy, TurnFlag);
		gameLoop.update();

		setInterval(() => {
			gameLoop.addComponent(enemy, new FightFlag());
			gameLoop.update();
		}, 1000);
	}

	function fightResolve() {
		setTimeout(() => {
			gameLoop.removeComponent(player, DamageComponent);
			gameLoop.removeComponent(enemy, DamageComponent);
		}, 5000);

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

		gameLoop.addComponent(player, new TurnFlag());
		gameLoop.update();
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

<div class="aspect-video w-11/12 flex flex-row items-center justify-between">
	<div class="flex flex-row items-center justify-start space-x-5 w-full">
		<div class="flex flex-col items-center space-y-5">
			{#if gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(player, DamageComponent) !== undefined 
				&& gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(player, DamageComponent).resolved === true
				&& gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(player, DamageComponent).damage > 0
			}
				<p in:fly={{ y: 10, duration: 2000 }} out:fade class="h3 text-red-500">- {gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(player, DamageComponent)?.damage}</p>
			{/if}
			<Healthbar currentHealth={gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(player, HealthComponent)?.currentHealth} maxHealth={gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(player, HealthComponent)?.maxHealth} />
			<button on:click={() => drawCard()}>
				<Deck deckSize={gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(player, DeckComponent)?.cards.length} on:click={() => drawCard()}/>
			</button>
			<Discard deckSize={gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(player, DiscardComponent)?.cards.length} />	
		</div>

		<div class="flex flex-col items-start space-y-5">
			<Hand>
				{#each gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(player, HandComponent)?.cards as card}
					<PlayingCard {card} />
				{/each}
			</Hand>

			<p>Power : {gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(player, AttackComponent)?.attack}</p>
		</div>
		
	</div>
	<div class="w-4/12">
		{#if gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(player, FightFlag) !== undefined}
			<button on:click={() => fight()} >Fight</button>
		{/if}
		<button on:click={() => nextTurn()} >EndTurn</button>

	</div>
	<div class="flex flex-row-reverse items-center justify-start space-x-5 w-full">
		<div class="flex flex-col items-center space-y-5">
			{#if gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(enemy, DamageComponent) !== undefined 
				&& gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(enemy, DamageComponent).resolved === true
				&& gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(enemy, DamageComponent).damage > 0
			}
				<p in:fly={{ y: 10, duration: 2000 }} out:fade class="h3 text-red-500">- {gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(enemy, DamageComponent)?.damage}</p>
			{/if}
			<Healthbar currentHealth={gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(enemy, HealthComponent)?.currentHealth} maxHealth={gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(enemy, HealthComponent)?.maxHealth} />
			<Deck deckSize={gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(enemy, DeckComponent)?.cards.length}/>
			<Discard deckSize={gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(enemy, DiscardComponent)?.cards.length} />	
		</div>
		<div class="flex flex-col items-start space-y-5">
			<Hand>
				{#each gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(enemy, HandComponent)?.cards as card}
					<PlayingCard {card} isEnemy={gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(enemy, EnemyComponent) !== undefined} />
				{/each}
			</Hand>

			<p>{gameLoop.getSystem(System.ActorObservable)?.getComponentFromEntity(enemy, AttackComponent)?.attack}</p>
		</div>

	</div>
</div>