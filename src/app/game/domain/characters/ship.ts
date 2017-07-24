import * as $ from 'jquery';

import { Timer } from '../../core/infra';
import { store } from '../../core/infra/data';

import { Character } from '.';
import { Projectile } from '../projectiles';

export class Ship extends Character {
  private timer: Timer;

  constructor(config: any) {
    super(config);
    this.timer = new Timer(this.config.timeNextMove);

    $(this.direction).on('lift', this.lift.bind(this));
    $(this.direction).on('lower', this.lower.bind(this));

    $(document).on('space', (_, pressed: boolean) => this.shoot(pressed, this.config.projectiles.first));
    $(document).on('f', (_, pressed: boolean) => this.shoot(pressed, this.config.projectiles.second));
  }

  updates(): void {
    super.updates();
    this.moves();
  }

  private lift(): void {
    this.sprite.row = (this.sprite.row <= 0) ? 0 : this.sprite.row - 1;
  }

  private lower(_, move: boolean): void {
    this.sprite.row = (this.sprite.row >= 2) ? 2 : this.sprite.row + 1;
  }

  private async shoot(pressed: boolean, munition: string): Promise<void> {
    if (!pressed) {
      return;
    }

    const config = await store.get('projectiles', munition);
    const projectile = new Projectile(config, this);

    $(this).trigger('shot', [projectile]);
  }

  private moves(): void {
    if (!this.timer.ended) {
      return;
    }

    this.sprite.col = (this.sprite.col === 2) ? 0 : this.sprite.col + 1;
  }
}
