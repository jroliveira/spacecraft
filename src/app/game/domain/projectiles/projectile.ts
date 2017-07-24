import * as $ from 'jquery';

import { Collide, Configurable, Updatable } from '../../core';

import { Character } from '../characters';

export class Projectile extends Collide implements Configurable, Updatable {
  constructor(
    public config: any,
    character: Character
  ) {
    super(config);
    this.updatePos(character.initPosShot());
  }

  updates(): void {
    const width = this.config.canvas.width - this.config.width;

    if (this.pos.x >= width) {
      $(this).trigger('destroy', [this]);
      return;
    }

    this.pos.toRight(this.config.speed);
  }

  resolvesCollision(obstacle: Collide): void {
    super.resolvesCollision(obstacle);

    if (this.destroyed) {
      $(this).trigger('destroy', [this]);
    }
  }
}
