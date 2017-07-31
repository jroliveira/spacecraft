import * as $ from 'jquery';

import { Entity } from '..';

import { Character } from '../characters';

export class Projectile extends Entity {
  constructor(
    config: any,
    character: Character
  ) {
    super(config);
    this.move(character.initPosShot());
  }

  update(): void {
    const width = this.config.canvas.width - this.config.width;

    if (this.pos.x >= width) {
      $(document).trigger('entity:remove', [this]);
      return;
    }

    this.pos.toRight(this.config.speed);
  }

  resolvesCollision(obstacle: Entity): void {
    super.resolvesCollision(obstacle);

    if (this.collidable.destroyed) {
      $(document).trigger('entity:remove', [this]);
    }
  }
}
