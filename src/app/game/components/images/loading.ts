import { Timer } from '../../infra';

import { ImageBase } from '.';

export class Loading extends ImageBase {
  private readonly timer: Timer;
  private frameIndex = 0;

  constructor(
    context: CanvasRenderingContext2D,
    config: any,
    entity: any
  ) {
    super(context, config, entity);
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
    const x = (this.entity.config.canvas.width - 100) / 2;
    const y = (this.entity.config.canvas.height - 100) / 2;

    this.context.drawImage(
      this.img.value,
      this.frameIndex * this.config.width / this.config.frame.total,
      0,
      this.config.width / this.config.frame.total,
      this.config.height,
      x,
      y,
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
