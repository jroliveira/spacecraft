import * as $ from 'jquery';

import { Collidable, Updatable } from '../../core/behaviors';

import { Entity } from '..';

import { Character } from '../characters';

export class Projectile extends Collidable implements Entity, Updatable {
  constructor(
    public readonly config: any,
    character: Character
  ) {
    super(config);
    this.updatePos(character.initPosShot());
  }

  update(): void {
    const width = this.config.canvas.width - this.config.width;

    if (this.pos.x >= width) {
      $(document).trigger('entity:remove', [this]);
      return;
    }

    this.pos.toRight(this.config.speed);
  }

  resolvesCollision(obstacle: Collidable): void {
    super.resolvesCollision(obstacle);

    if (this.destroyed) {
      $(document).trigger('entity:remove', [this]);
    }
  }
}
