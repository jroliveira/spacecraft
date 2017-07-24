import * as $ from 'jquery';

import { Collide, Configurable, Updatable } from '../../core';

export abstract class Enemy extends Collide implements Configurable, Updatable {
  constructor(public config: any) {
    super(config);
  }

  updates(): void {
    if (this.pos.x <= 0) {
      $(this).trigger('destroy', [this]);
      return;
    }

    this.pos.toLeft(this.config.speed);
  }

  resolvesCollision(obstacle: Collide): void {
    super.resolvesCollision(obstacle);

    if (this.destroyed) {
      $(this).trigger('destroy', [this]);
    }
  }
}
