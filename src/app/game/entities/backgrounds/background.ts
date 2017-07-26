import { Position } from '../../core/structs';

import { Entity } from '..';

export class Background implements Entity {
  protected readonly pos: Position;

  constructor(public readonly config: any) {
    this.pos = new Position(config.pos.x, config.pos.y);
  }
}
