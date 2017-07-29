import { Updatable } from '../../core/behaviors';

import { Background } from '.'

export class MovingBackground extends Background implements Updatable {
  constructor(config: any) {
    super(config);
  }

  update(): void {
    this.pos.toLeft(this.config.speed);

    if ((Math.abs(this.pos.x) >= this.config.width)) {
      this.pos.reset(0, this.pos.y);
    }
  }
}
