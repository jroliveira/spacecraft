import { Timer } from '../../infra';

export class Loader {
  private readonly timer: Timer;
  private readonly ticksPerFrame = 4;
  private readonly numberOfFrames = 25;
  private frameIndex = 0;

  constructor(private context: CanvasRenderingContext2D) {
    this.timer = new Timer(this.ticksPerFrame);
  }

  updates(): void {
    if (!this.timer.ended) {
      return;
    }

    if (this.frameIndex >= this.numberOfFrames - 1) {
      this.frameIndex = 0;
      return;
    }

    this.frameIndex++;
  }
}
