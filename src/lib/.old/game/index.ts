import { BattleStore } from '../battle';
import { CharacterStore, EnemyStore } from '../character';

export class GameStore {
    public uuid: string = "";
    public battles: Array<BattleStore> = [];
    public player: CharacterStore;
    public state: string = 'idle';

    constructor(player: CharacterStore) {
        this.player = player;
    }

    public initGame(): GameStore {
        this.state = 'initialization';

        this.state = 'enemy-creation';
        const enemy: EnemyStore = new EnemyStore();
        enemy.generateStandardEnemy();
        this.state = 'enemy-created';

        this.state = 'player-creation';
        this.player.generateStandardPlayer();
        this.state = 'player-created';

        this.state = 'battle-creation';
        const battle: BattleStore = new BattleStore(enemy);
        battle.initBattle(this.player.deck);
        this.battles.push(battle);
        this.state = 'battle-created';

        this.state = 'started';

        return this;
    }
}
