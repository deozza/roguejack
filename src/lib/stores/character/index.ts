export class Character {
    public name: string = '';
    public level: number = 1;
    public maxHealth: number = 10;
    public currentHealth: number = 10;

    public takeDamage(damage: number) {
        this.currentHealth = Math.max(this.currentHealth - damage, 0);
    }

    public heal(heal: number) {
        this.currentHealth = Math.min(this.currentHealth + heal, this.maxHealth);
    }

    public getHealthBarColor(): string {
        if (this.currentHealth > this.maxHealth * 0.75) {
            return 'bg-green-500';
        }
    
        if (this.currentHealth > this.maxHealth * 0.5) {
            return 'bg-yellow-500';
        }
    
        if (this.currentHealth > this.maxHealth * 0.25) {
            return 'bg-orange-500';
        }
        return 'bg-red-500';
    }
}