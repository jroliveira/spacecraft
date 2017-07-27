import { Position } from '../../core/structs';

import { Enemy } from '.';

export class Asteroid extends Enemy {
  constructor(config: any) {
    super(config);
    this.updatePos(this.initPos());
  }

  private initPos(): Position {
    const min = 1;
    const max = 540 - this.config.height;
    const y = Math.floor(Math.random() * (max - min + 1)) + min;

    return new Position(900, y);
  }
}
