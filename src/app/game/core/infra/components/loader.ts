import { getImage } from '../data';
import { Timer } from '../../infra';
import { Component } from '.';

export class Loader extends Component {
  private readonly timer: Timer;
  private readonly ticksPerFrame = 4;
  private readonly numberOfFrames = 25;
  private frameIndex = 0;

  private readonly width = 2500;
  private readonly height = 100;

  private image: any = new Image();

  constructor(private context: CanvasRenderingContext2D) {
    super(undefined, undefined);
    this.timer = new Timer(this.ticksPerFrame);
    this.initialize();
  }

  draw(): void {
    this.context.fillStyle = '#111111';
    this.context.fillRect(0, 0, 900, 540);

    this.context.drawImage(
      this.image,
      this.frameIndex * this.width / this.numberOfFrames,
      0,
      this.width / this.numberOfFrames,
      this.height,
      (900 - 100) / 2,
      (540 - 100) / 2,
      this.width / this.numberOfFrames,
      this.height);
  }

  updates(): any {
    if (!this.timer.ended) {
      return;
    }

    if (this.frameIndex >= this.numberOfFrames - 1) {
      this.frameIndex = 0;
      return;
    }

    this.frameIndex++;
  }

  private async initialize(): Promise<void> {
    this.image.src = await getImage('components/loading');
  }
}
