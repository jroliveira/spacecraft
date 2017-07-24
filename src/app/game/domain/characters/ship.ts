import * as $ from 'jquery';

import { store } from '../../core/infra/data';

import { Character } from '.';
import { Projectile } from '../projectiles';

export class Ship extends Character {
  constructor(config: any) {
    super(config);

    $(document).on('up', this.lift.bind(this));
    $(document).on('down', this.lower.bind(this));
    $(document).on('left', (_, move: boolean) => this.keys.left = move);
    $(document).on('right', (_, move: boolean) => this.keys.right = move);

    $(document).on('space', (_, pressed: boolean) => this.shoot(pressed, this.config.projectiles.first));
    $(document).on('f', (_, pressed: boolean) => this.shoot(pressed, this.config.projectiles.second));
  }

  private lift(_, move: boolean): void {
    this.keys.up = move;

    if (move) {
      this.sprite.row = (this.sprite.row <= 0) ? 0 : this.sprite.row - 1;
    }
  }

  private lower(_, move: boolean): void {
    this.keys.down = move;

    if (move) {
      this.sprite.row = (this.sprite.row >= 2) ? 2 : this.sprite.row + 1;
    }
  }

  private async shoot(pressed: boolean, munition: string): Promise<void> {
    if (!pressed) {
      return;
    }

    const config = await store.get('projectiles', munition);
    const projectile = new Projectile(config, this);

    $(this).trigger('shot', [projectile]);
  }
}
