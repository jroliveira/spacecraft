import { Timer } from '../../infra';

import { ImageBase } from '.';

export class Loading extends ImageBase<any> {
  private readonly timer: Timer;
  private frameIndex = 0;

  constructor(
    context: CanvasRenderingContext2D,
    config: any,
    _
  ) {
    super(context, config, _);
    this.timer = new Timer(this.config.frame.ticks);
  }

  draw(): void {
    if (!this.img.loaded) {
      return;
    }

    this.drawImage();
    this.update();
  }

  private drawImage(): void {
    this.context.drawImage(
      this.img.value,
      this.frameIndex * this.config.width / this.config.frame.total,
      0,
      this.config.width / this.config.frame.total,
      this.config.height,
      this.config.pos.x,
      this.config.pos.y,
      this.config.width / this.config.frame.total,
      this.config.height);
  }

  private update(): void {
    if (!this.timer.ended) {
      return;
    }

    if (this.frameIndex >= this.config.frame.total - 1) {
      this.frameIndex = 0;
      return;
    }

    this.frameIndex++;
  }
}
