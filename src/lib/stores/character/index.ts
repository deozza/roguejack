import { DeckStore } from '../deck';
import { DiscardStore } from '../discard';
import { HandStore } from '../hand';

export class CharacterStore {
    public deck: DeckStore = new DeckStore();
    public discard: DiscardStore = new DiscardStore();
    public hand: HandStore = new HandStore();
    public currentLife: number = 20;
    public maxLife: number = 20;
    public name: string = '';
}