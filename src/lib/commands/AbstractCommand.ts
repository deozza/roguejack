export default abstract class AbstractCommand {
    public abstract execute(): void;
    public abstract undo(): void;
    public abstract redo(): void;
}