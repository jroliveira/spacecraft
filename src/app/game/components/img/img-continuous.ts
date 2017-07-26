import { Img } from './img';

export class ImgContinuous extends Img {
  constructor(
    readonly config: any,
    readonly entity: any,
    readonly context: CanvasRenderingContext2D
  ) {
    super(config, entity, context);
  }

  draw(): void {
    if (!this.loaded) {
      return;
    }

    this.context.drawImage(this.image, this.entity.pos.x, 0);
    this.context.drawImage(this.image, this.entity.pos.x + this.entity.config.width, 0);
  }
}
