import * as $ from 'jquery';

export abstract class Input {
  constructor() { }

  abstract bind(): void;

  protected abstract unbind(): void;

  protected enter(pressed: boolean): void {
    $(document).trigger('command:enter', [pressed]);
  }

  protected space(pressed: boolean): void {
    $(document).trigger('command:space', [pressed]);
  }

  protected f(pressed: boolean): void {
    $(document).trigger('command:f', [pressed]);
  }

  protected r(pressed: boolean): void {
    $(document).trigger('command:r', [pressed]);
  }

  protected up(pressed: boolean): void {
    $(document).trigger('command:up', [pressed]);
  }

  protected down(pressed: boolean): void {
    $(document).trigger('command:down', [pressed]);
  }

  protected left(pressed: boolean): void {
    $(document).trigger('command:left', [pressed]);
  }

  protected right(pressed: boolean): void {
    $(document).trigger('command:right', [pressed]);
  }
}
