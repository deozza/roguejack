import { type StateInterface } from '../../stateInterface';

export class BattleWonState implements StateInterface {
	public name: string = 'BattleWonState';
	
	public onStateEnter = (): void => {
		console.log(` ${this.name} entered`);
	};

	public onStateExecute(): void {
		console.log(` ${this.name} executed`);
	}

	public onStateExit = (): void => {
		console.log(` ${this.name} exited`);
	};
}
