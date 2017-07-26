import * as $ from 'jquery';

import { Timer } from '../../infra';
import { store } from '../../infra/data';

import { Phase } from '.';
import { Starbase } from '../objects';
import { Asteroid } from '../enemies';

export class FirstPhase extends Phase {
  private readonly enemyTimer: Timer;
  private readonly starbaseTimer: Timer;

  constructor(readonly config: any) {
    super(config);

    this.enemyTimer = new Timer(200);
    this.starbaseTimer = new Timer(2000);

    $(document).on('entity:add', (_, entity) => this.addEntity(entity));
  }

  async update(): Promise<void> {
    super.update();

    await this.enterEnemy();
    await this.showStarbase();
  }

  private async enterEnemy(): Promise<void> {
    if (!this.enemyTimer.ended) {
      return;
    }

    const config = await store.get('enemies', 'asteroid');
    const enemy = new Asteroid(config);

    this.addEntity(enemy);
  }

  private async showStarbase(): Promise<void> {
    if (!this.starbaseTimer || !this.starbaseTimer.ended) {
      return;
    }

    const config = await store.get('objects', 'starbase');
    const starbase = new Starbase(config);

    this.addEntity(starbase);
  }
}
