import * as $ from 'jquery';

import { Background } from '.'

export class MovingBackground extends Background {

  constructor(config: any) {
    super(config);
  }

  updates(): void {
    this.pos.toLeft(this.config.speed);

    if ((Math.abs(this.pos.x) >= this.config.width)) {
      this.pos.reset(0, this.pos.y);
    }
  }
}
