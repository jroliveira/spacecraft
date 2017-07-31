import * as $ from 'jquery';

import { Entity } from '..';

export abstract class Enemy extends Entity {
  constructor(config: any) {
    super(config);
  }

  update(): void {
    super.update();

    if (this.pos.x <= 0) {
      $(document).trigger('entity:remove', [this]);
      return;
    }

    this.pos.toLeft(this.config.speed);
  }

  resolvesCollision(obstacle: Entity): void {
    super.resolvesCollision(obstacle);

    if (this.collidable.destroyed) {
      $(document).trigger('entity:remove', [this]);
    }
  }
}
