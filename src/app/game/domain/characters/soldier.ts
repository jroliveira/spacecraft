import * as $ from 'jquery';

import { Character } from '.';

export class Soldier extends Character {
  constructor(config: any) {
    super(config)

    $(document).on('up', this.lift.bind(this));
    $(document).on('down', this.lower.bind(this));
    $(document).on('left', this.toLeft.bind(this));
    $(document).on('right', this.toRight.bind(this));
  }

  private lift(_, move: any): void {
    this.keys.up = move;

    if (move) {
      this.sprite.row = 3;
    }
  }

  private lower(_, move: any): void {
    this.keys.down = move;

    if (move) {
      this.sprite.row = 0;
    }
  }

  private toLeft(_, move: any): void {
    this.keys.left = move;

    if (move) {
      this.sprite.row = 1;
    }
  }

  private toRight(_, move: any): void {
    this.keys.right = move;

    if (this.keys.right) {
      this.sprite.row = 2;
    }
  }
}
