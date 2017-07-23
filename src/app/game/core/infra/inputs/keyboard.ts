import * as $ from 'jquery';
import { Input } from '.';

export class Keyboard extends Input {
  constructor() {
    super();
  }

  protected unbind(): void {
    $(document).unbind('keydown');
    $(document).unbind('keyup');
  }

  bind(): void {
    $(document).bind('keydown', event => {
      event.preventDefault();

      switch (event.keyCode) {
        case 13:
          this.enter(true);
          break;
        case 32:
          this.space(true);
          break;
        case 70:
          this.f(true);
          break;
        case 82:
          this.r(true);
          break;
        case 37:
          this.left(true);
          break;
        case 38:
          this.up(true);
          break;
        case 39:
          this.right(true);
          break;
        case 40:
          this.down(true);
          break;
      }
    });

    $(document).bind('keyup', event => {
      event.preventDefault();

      switch (event.keyCode) {
        case 13:
          this.enter(false);
          break;
        case 32:
          this.space(false);
          break;
        case 70:
          this.f(false);
          break;
        case 82:
          this.r(false);
          break;
        case 37:
          this.left(false);
          break;
        case 38:
          this.up(false);
          break;
        case 39:
          this.right(false);
          break;
        case 40:
          this.down(false);
          break;
      }
    });
  }
}
