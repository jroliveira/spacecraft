import * as $ from 'jquery';

export class Direction {
  private _up = false;
  private _down = false;
  private _left = false;
  private _right = false;

  constructor() {
    $(document).on('up', this.lift.bind(this));
    $(document).on('down', this.lower.bind(this));
    $(document).on('left', this.toLeft.bind(this));
    $(document).on('right', this.toRight.bind(this));
  }

  get moving(): boolean {
    return this._up || this._down || this._left || this._right;
  }

  get up() {
    return this._up;
  }

  get down() {
    return this._down;
  }

  get left() {
    return this._left;
  }

  get right() {
    return this._right;
  }

  private lift(_, move: boolean): void {
    if (typeof move === 'undefined') {
      return;
    }

    this._up = move;

    if (move) {
      $(this).trigger('lift');
    }
  }

  private lower(_, move: boolean): void {
    if (typeof move === 'undefined') {
      return;
    }

    this._down = move;

    if (move) {
      $(this).trigger('lower');
    }
  }

  private toLeft(_, move: boolean): void {
    if (typeof move === 'undefined') {
      return;
    }

    this._left = move;

    if (move) {
      $(this).trigger('to-left');
    }
  }

  private toRight(_, move: boolean): void {
    if (typeof move === 'undefined') {
      return;
    }

    this._right = move;

    if (move) {
      $(this).trigger('to-right');
    }
  }
}
