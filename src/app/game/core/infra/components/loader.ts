import { Component } from '.';

export class Loader extends Component {
  private frameIndex = 0;
  private tickCount = 0;
  private ticksPerFrame = 4;
  private numberOfFrames = 25;

  private width = 2500;
  private height = 100;

  private image: any = new Image();

  constructor(private context: CanvasRenderingContext2D) {
    super(undefined, undefined);
    this.image.src = 'http://localhost:4000/client/img/loadingSprite.png';
  }

  draw(): void {
    this.context.fillStyle = '#111111';
    this.context.fillRect(0, 0, 1170, 600);

    this.context.drawImage(
      this.image,
      this.frameIndex * this.width / this.numberOfFrames,
      0,
      this.width / this.numberOfFrames,
      this.height,
      (1170 - 100) / 2,
      (600 - 100) / 2,
      this.width / this.numberOfFrames,
      this.height);
  }

  updates(): any {
    this.tickCount += 1;

    if (this.tickCount <= this.ticksPerFrame) {
      return;
    }

    this.tickCount = 0;

    if (this.frameIndex >= this.numberOfFrames - 1) {
      this.frameIndex = 0;
      return;
    }

    this.frameIndex += 1;
  }
}
