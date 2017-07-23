import * as $ from 'jquery';

import { store } from '../../core/infra/data';

import { Phase } from '.';
import { Starbase } from '..';
import { Projectile } from '../projectiles';
import { Asteroid } from '../enemies';

export class FirstPhase extends Phase {
  private timer = 0;

  constructor(config: any) {
    super(config);
  }

  async configure(): Promise<void> {
    await super.configure();

    $(this.background).on('ended', this.showStarbase.bind(this));
    $(this.character).on('shot', (_, projectile: Projectile) => this.addElement(projectile));
    $(this).on('updated', this.enterEnemy.bind(this));
  }

  private async enterEnemy(): Promise<void> {
    this.timer++;

    if (this.timer !== 200) {
      return;
    }

    this.timer = 0;
    const config = await store.get('enemies', 'asteroid');
    const enemy = new Asteroid(config);

    this.addElement(enemy);
  }

  private async showStarbase(): Promise<void> {
    const config = await store.get('entities', 'starbase');
    const starbase = new Starbase(config);

    this.addElement(starbase);
  }
}
