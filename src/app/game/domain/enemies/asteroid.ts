import { Position } from '../../core/infra';

import { Enemy } from '.';

export class Asteroid extends Enemy {
  constructor(config: any) {
    super(config);
    this.updatePos(this.initPos());
  }

  private initPos(): Position {
    const min = 1;
    const max = 600 - this.config.height;
    const posY = Math.floor(Math.random() * (max - min + 1)) + min;

    return { x: 1170, y: posY };
  }
}
