import { Updatable } from '../../core';

export class Background implements Updatable {
  protected pos: any;

  constructor(protected config: any) {
    this.pos = config.pos;
  }

  updates(): void { }
}
