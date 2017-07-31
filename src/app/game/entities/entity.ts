import { Configurable, Collidable, Updatable } from '../core/behaviors';
import { Position } from '../core/structs';

export abstract class Entity implements Configurable, Updatable {
  private _pos: Position;
  readonly collidable: Collidable;

  constructor(public readonly config: any) {
    const pos = this.config.pos || { x: 0, y: 0 };
    this.move(new Position(pos.x, pos.y));

    if (this.config.collidable) {
      this.collidable = new Collidable(this);
    }
  }

  get pos(): Position {
    return this._pos;
  }

  update(): void { }

  resolvesCollision(obstacle: Entity): void {
    if (!obstacle.collidable) {
      return;
    }

    this.collidable.resolvesCollision(obstacle);
  }

  move(pos: Position): void {
    this._pos = pos;
  }
}
