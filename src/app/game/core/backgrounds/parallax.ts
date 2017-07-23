import { Background } from '.'

export class Parallax extends Background {
  constructor(config: any) {
    super(config);
  }

  updates(): void {
    this.pos.x = (Math.abs(this.pos.x) >= this.config.width) ? 0 : this.pos.x - this.config.speed;
  }
}
