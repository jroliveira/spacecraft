import { Dimension, Position } from '../structs';

export abstract class Collidable {
  private damage: number;
  private dimension: Dimension;
  private _health: number;
  private _pos: Position;

  constructor(config: any) {
    this.reboot(config);
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

  resolvesCollision(obstacle: Collidable): void {
    this._health = this._health - obstacle.damage;
  }

  collidedWith(obstacle: Collidable): boolean {
    return (this.pos.x <= obstacle.horizontal
      && obstacle.pos.x <= this.horizontal
      && this.pos.y <= obstacle.vertical
      && obstacle.pos.y <= this.vertical);
  }

  protected reboot(config: any) {
    this._health = config.health || 999;
    this.damage = config.damage || 0;

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
