import { Configurable, Updatable } from '../core';
import { Dimension, Position } from '../core/infra';

export abstract class Collide {
  private damage: number;
  private dimension: Dimension;
  private _health: number;
  private _pos: Position;

  constructor(config: any) {
    this.initialize(config);
  }

  get health(): number {
    return this._health;
  }

  get pos(): Position {
    return this._pos;
  }

  private get horizontal(): number {
    return this.pos.x + this.dimension.width;
  }

  private get vertical(): number {
    return this.pos.y + this.dimension.height;
  }

  protected get destroyed(): boolean {
    return this.health <= 0;
  }

  resolvesCollision(obstacle: Collide): void {
    this._health = this._health - obstacle.damage;
  }

  collidedWith(obstacle: Collide): boolean {
    return (this.pos.x <= obstacle.horizontal
      && obstacle.pos.x <= this.horizontal
      && this.pos.y <= obstacle.vertical
      && obstacle.pos.y <= this.vertical);
  }

  protected initialize(config: any) {
    this._health = config.health || 999;
    this.damage = config.damage || 999;

    this.dimension = {
      width: config.width,
      height: config.height
    }

    config.pos = config.pos || {
      x: 0,
      y: 0
    };

    this._pos = new Position(config.pos.x, config.pos.y);
  }

  protected updatePos(pos: Position): void {
    this._pos = pos;
  }
}
