import * as $ from 'jquery';

import { Collide, Configurable, Updatable } from '../core';

import { Character } from './characters';

export class Starbase extends Collide implements Configurable, Updatable {
  constructor(public config: any) {
    super(config);
  }

  updates(): void { }

  resolvesCollision(obstacle: Collide): void {
    if (obstacle instanceof Character) {
      $(document).trigger('phaseEnded');
    }
  }
}
