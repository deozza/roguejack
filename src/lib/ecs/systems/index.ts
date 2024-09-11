import ActorObservableSystem from "./ActorObservableSystem/ActorObservableSystem";
import AttackSystem from "./AttackSystem/AttackSystem";
import DiscardSystem from "./DiscardSystem/DiscardSystem";
import DrawSystem from "./DrawSystem/DrawSystem";
import FightSystem from "./FightSystem/FightSystem";
import HealthSystem from "./HealthSystem/HealthSystem";

export const System = {
    Attack: new AttackSystem(),
    Discard: new DiscardSystem(),
    Draw: new DrawSystem(),
    Fight: new FightSystem(),
    Health: new HealthSystem(),
    ActorObservable: new ActorObservableSystem()
}