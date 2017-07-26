import * as $ from 'jquery';

import { Timer } from '../../infra';
import { store } from '../../infra/data';

import { Character } from '.';
import { Projectile } from '../projectiles';

export class Ship extends Character {
  private readonly timer: Timer;

  constructor(readonly config: any) {
    super(config);
    this.timer = new Timer(this.config.timeNextMove);

    $(this.direction).on('lift', this.lift.bind(this));
    $(this.direction).on('lower', this.lower.bind(this));

    $(document).on('command:space', (_, pressed: boolean) => this.shoot(pressed, this.config.projectiles.first));
    $(document).on('command:f', (_, pressed: boolean) => this.shoot(pressed, this.config.projectiles.second));
  }

  update(): void {
    super.update();
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

    $(document).trigger('entity:add', [projectile]);
  }

  private moves(): void {
    if (!this.timer.ended) {
      return;
    }

    this.sprite.col = (this.sprite.col === 2) ? 0 : this.sprite.col + 1;
  }
}
