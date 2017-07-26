import * as $ from 'jquery';

import { Collidable, Updatable } from '../../core/behaviors';

import { Entity } from '..';

export abstract class Enemy extends Collidable implements Entity, Updatable {
  constructor(public readonly config: any) {
    super(config);
  }

  update(): void {
    if (this.pos.x <= 0) {
      $(this).trigger('destroy', [this]);
      return;
    }

    this.pos.toLeft(this.config.speed);
  }

  resolvesCollision(obstacle: Collidable): void {
    super.resolvesCollision(obstacle);

    if (this.destroyed) {
      $(this).trigger('destroy', [this]);
    }
  }
}
