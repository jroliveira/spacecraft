import * as $ from 'jquery';

import { Entity } from '..';
import { Character } from './../characters';

export class Starbase extends Entity {
  constructor(public readonly config: any) {
    super(config);
  }

  resolvesCollision(obstacle: Entity): void {
    if (obstacle instanceof Character) {
      $(document).trigger('scenario:load', 'starbase');
    }
  }
}
