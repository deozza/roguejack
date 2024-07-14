import type { Card } from '$lib/models/card/model';
import type { Game } from '$lib/models/game/model';
import { Turn } from '$lib/models/turn/model';
import { gameStore } from '$lib/stores/game';
import { type StateInterface } from '../../stateInterface';

export class TurnInitState implements StateInterface {
	public name: string = 'TurnInitState';

	public onStateEnter = (): void => {
		console.log('Turn Idle State Entered');
	};

	public onStateExecute(data: object): void {
		const game: Game = data['game'] as Game;

		const turn: Turn = new Turn(game.getCurrentBattle().turns.length + 1);

		let card: Card | null = game.player.deck.drawTopCard();
		if (card === null) {
			console.log('No cards left in deck');
			return;
		}
		turn.playerHand.addCard(card);

		card = game.player.deck.drawTopCard();
		if (card === null) {
			console.log('No cards left in deck');
			return;
		}
		turn.playerHand.addCard(card);

		game.getCurrentBattle().addTurn(turn);

		gameStore.set(game);
	}

	public onStateExit = (): void => {
		console.log('Turn Idle State Exited');
	};
}
