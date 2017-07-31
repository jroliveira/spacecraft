import { Entity } from '../../entities';

import { Dimension, Position } from '../structs';

export class Collidable {
  private damage: number;
  private dimension: Dimension;
  private _health: number;

  constructor(private readonly entity: Entity) {
    this.respawn();
  }

  get health(): number {
    return this._health;
  }

  get horizontal(): number {
    return this.entity.pos.x + this.dimension.width;
  }

  get vertical(): number {
    return this.entity.pos.y + this.dimension.height;
  }

  get destroyed(): boolean {
    return this.health <= 0;
  }

  resolvesCollision(obstacle: Entity): void {
    if (!obstacle.collidable) {
      return;
    }

    this._health = this._health - obstacle.collidable.damage;
  }

  collidedWith(obstacle: Entity): boolean {
    if (!obstacle.collidable) {
      return;
    }

    return (this.entity.pos.x <= obstacle.collidable.horizontal
      && obstacle.pos.x <= this.horizontal
      && this.entity.pos.y <= obstacle.collidable.vertical
      && obstacle.pos.y <= this.vertical);
  }

  respawn() {
    this._health = this.entity.config.collidable.health;
    this.damage = this.entity.config.collidable.damage;

    this.dimension = {
      width: this.entity.config.width,
      height: this.entity.config.height
    }

    const { x, y } = this.entity.config.pos || { x: 0, y: 0 };

    this.entity.move(new Position(x, y));
  }
}
