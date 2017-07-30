import * as $ from 'jquery';

import { Timer } from '../../infra';

import { Character } from '.';

export class Soldier extends Character {
  private readonly timer: Timer;
  private forward: boolean;

  constructor(config: any) {
    super(config)
    this.timer = new Timer(this.config.timeNextMove);

    $(this.direction).on('lift', () => this.sprite.row = 3);
    $(this.direction).on('lower', () => this.sprite.row = 0);
    $(this.direction).on('to-left', () => this.sprite.row = 1);
    $(this.direction).on('to-right', () => this.sprite.row = 2);
  }

  update(): void {
    super.update();

    if (this.direction.moving) {
      this.moves();
    }
  }

  private moves(): void {
    if (!this.timer.ended) {
      return;
    }

    if (this.sprite.col === 0) {
      this.sprite.col++;
      this.forward = true;
      return;
    }

    if (this.sprite.col === 2) {
      this.sprite.col--;
      this.forward = false;
      return;
    }

    this.sprite.col = this.forward ? this.sprite.col + 1 : this.sprite.col - 1;
  }
}
