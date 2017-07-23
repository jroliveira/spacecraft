import * as $ from 'jquery';

export abstract class Input {
  constructor() { }

  abstract bind(): void;

  protected abstract unbind(): void;

  protected enter(pressed: boolean): void {
    $(document).trigger('enter', [pressed]);
  }

  protected space(pressed: boolean): void {
    $(document).trigger('space', [pressed]);
  }

  protected f(pressed: boolean): void {
    $(document).trigger('f', [pressed]);
  }

  protected r(pressed: boolean): void {
    $(document).trigger('r', [pressed]);
  }

  protected up(pressed: boolean): void {
    $(document).trigger('up', [pressed]);
  }

  protected down(pressed: boolean): void {
    $(document).trigger('down', [pressed]);
  }

  protected left(pressed: boolean): void {
    $(document).trigger('left', [pressed]);
  }

  protected right(pressed: boolean): void {
    $(document).trigger('right', [pressed]);
  }
}
