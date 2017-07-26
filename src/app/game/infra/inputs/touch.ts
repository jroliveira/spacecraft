import * as $ from 'jquery';
import { Input } from '.';

export class Touch extends Input {
  constructor() {
    super();
  }

  protected unbind(): void {
    $(document).unbind('touchstart');
  }

  bind(): void {
    $(document).bind('touchstart', event => {
      event.preventDefault();

      this.enter(true);
    });
  }
}
