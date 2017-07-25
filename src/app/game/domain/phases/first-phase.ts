import * as $ from 'jquery';

import { Timer } from '../../core/infra';
import { store } from '../../core/infra/data';

import { Phase } from '.';
import { Starbase } from '..';
import { Projectile } from '../projectiles';
import { Asteroid } from '../enemies';

export class FirstPhase extends Phase {
  private enemyTimer: Timer;
  private starbaseTimer: Timer;

  constructor(config: any) {
    super(config);
    this.enemyTimer = new Timer(200);
    this.starbaseTimer = new Timer(2000);
  }

  async configure(): Promise<void> {
    await super.configure();

    $(this.character).on('shot', (_, projectile: Projectile) => this.addElement(projectile));
  }

  async updates(): Promise<void> {
    super.updates();

    await this.enterEnemy();
    await this.showStarbase();
  }

  private async enterEnemy(): Promise<void> {
    if (!this.enemyTimer.ended) {
      return;
    }

    const config = await store.get('enemies', 'asteroid');
    const enemy = new Asteroid(config);

    this.addElement(enemy);
  }

  private async showStarbase(): Promise<void> {
    if (!this.starbaseTimer || !this.starbaseTimer.ended) {
      return;
    }

    const config = await store.get('entities', 'starbase');
    const starbase = new Starbase(config);

    this.addElement(starbase);
  }
}
