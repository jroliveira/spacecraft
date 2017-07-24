import * as $ from 'jquery';

import { Background } from '.'

export class MovingBackground extends Background {
  private ended = false;

  constructor(config: any) {
    super(config);
  }

  updates(): void {
    if (this.ended) {
      return;
    }

    if ((Math.abs(this.pos.x) + this.config.canvas.width) < this.config.width) {
      this.pos.toLeft(this.config.speed);
      return;
    }

    this.ended = true;
    $(this).trigger('ended');
  }
}
