import { Configurable, Collide, Updatable } from '../../core';
import { Direction, Position, Sprite } from '../../core/infra';

export abstract class Character extends Collide implements Configurable, Updatable {
  protected readonly direction: Direction = new Direction();
  readonly sprite: Sprite;

  constructor(public config: any) {
    super(config);
    this.sprite = this.config.sprite;
  }

  initPosShot(): Position {
    const x = this.pos.x + (this.config.width + 5);
    const y = this.pos.y + (this.config.height / 2);

    return new Position(x, y);
  }

  updates(): void {
    if (this.direction.up && this.pos.y > 10) {
      this.pos.lift(this.config.speed.up);
    }

    if (this.direction.down && (this.pos.y + this.config.height) < this.config.canvas.height) {
      this.pos.lower(this.config.speed.down);
    }

    if (this.direction.left && this.pos.x > 0) {
      this.pos.toLeft(this.config.speed.left);
    }

    if (this.direction.right && (this.pos.x + this.config.width) < this.config.canvas.width) {
      this.pos.toRight(this.config.speed.right);
    }
  }

  resolvesCollision(obstacle: Collide): void {
    super.resolvesCollision(obstacle);

    if (this.destroyed) {
      this.initialize(this.config);
    }
  }
}
