import { Updatable } from '../../core';
import { Position } from '../../core/infra';

export class Background implements Updatable {
  protected readonly pos: Position;

  constructor(protected config: any) {
    this.pos = new Position(config.pos.x, config.pos.y);
  }

  updates(): void { }
}
