import * as $ from 'jquery';

import { Timer } from '../../core/infra';

import { Character } from '.';

export class Soldier extends Character {
  private timer: Timer;

  constructor(config: any) {
    super(config)
    this.timer = new Timer(this.config.timeNextMove);

    $(this.direction).on('lift', () => this.sprite.row = 3);
    $(this.direction).on('lower', () => this.sprite.row = 0);
    $(this.direction).on('to-left', () => this.sprite.row = 1);
    $(this.direction).on('to-right', () => this.sprite.row = 2);
  }

  updates(): void {
    super.updates();

    if (this.direction.moving) {
      this.moves();
    }
  }

  private moves(): void {
    if (!this.timer.ended) {
      return;
    }

    this.sprite.col = (this.sprite.col === 2) ? 0 : this.sprite.col + 1;
  }
}
