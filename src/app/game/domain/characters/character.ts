import { Configurable, Collide, Updatable } from '../../core';
import { Position } from '../../core/infra';

export abstract class Character extends Collide implements Configurable, Updatable {
  private _timeNextMove = 0;
  protected keys = { up: false, down: false, right: false, left: false };
  sprite: any;

  constructor(public config: any) {
    super(config);
    this.sprite = this.config.sprite;
  }

  protected get canMove(): boolean {
    this._timeNextMove++;

    if (this._timeNextMove < this.config.timeNextMove) {
      return false;
    }

    this._timeNextMove = 0;

    return true;
  }

  private get moving(): boolean {
    return this.keys.up || this.keys.down || this.keys.left || this.keys.right;
  }

  initPosShot(): Position {
    const posX = this.pos.x + (this.config.width + 5);
    const posY = this.pos.y + (this.config.height / 2);

    return { x: posX, y: posY };
  }

  updates(): void {
    if (this.keys.up) {
      if (this.pos.y <= 10) {
        return;
      }

      this.pos.y -= this.config.speed.up;
    }

    if (this.keys.down) {
      if ((this.pos.y + this.config.height) >= this.config.canvas.height) {
        return;
      }

      this.pos.y += this.config.speed.down;
    }

    if (this.keys.left) {
      if (this.pos.x <= 0) {
        return;
      }

      this.pos.x -= this.config.speed.left;
    }

    if (this.keys.right) {
      if ((this.pos.x + this.config.width) >= this.config.canvas.width) {
        return;
      }

      this.pos.x += this.config.speed.right;
    }

    if (!this.moving) {
      return;
    }

    this.moves();
  }

  resolvesCollision(obstacle: Collide): void {
    super.resolvesCollision(obstacle);

    if (this.destroyed) {
      this.initialize(this.config);
    }
  }

  private moves(): void {
    if (!this.canMove) {
      return;
    }

    this.sprite.col = (this.sprite.col === 2) ? 0 : this.sprite.col + 1;
  }
}
