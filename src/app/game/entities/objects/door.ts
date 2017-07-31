import * as $ from 'jquery';

import { Entity } from '..';
import { Character } from './../characters';

export class Door extends Entity {
  constructor(config: any) {
    super(config);
  }

  resolvesCollision(obstacle: Entity): void {
    if (obstacle instanceof Character) {
      console.log('toc toc... Hello, I\'m here!');
    }
  }
}
