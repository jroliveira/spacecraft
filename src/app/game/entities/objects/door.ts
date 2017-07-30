import * as $ from 'jquery';

import { Collidable } from '../../core/behaviors';

import { Entity } from '..';
import { Character } from './../characters';

export class Door extends Collidable implements Entity {
  constructor(public readonly config: any) {
    super(config);
  }

  resolvesCollision(obstacle: Collidable): void {
    if (obstacle instanceof Character) {
      console.log('toc toc... Hello, I\'m here!');
    }
  }
}
