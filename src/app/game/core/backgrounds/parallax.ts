import { Background } from '.'

export class Parallax extends Background {
  constructor(config: any) {
    super(config);
  }

  updates(): void {
    if ((Math.abs(this.pos.x) >= this.config.width)) {
      this.pos.reset(0, this.pos.y);
      return;
    }

    this.pos.toLeft(this.config.speed);
  }
}
