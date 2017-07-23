import { Collide } from '../..';
import { Img } from './img';

export class ImgContinuous extends Img {
  constructor(config: any, object: any, context: CanvasRenderingContext2D) {
    super(config, object, context);
  }

  draw(): void {
    if (!this.loaded) {
      return;
    }

    this.context.drawImage(this.image, this.object.pos.x, 0);
    this.context.drawImage(this.image, this.object.pos.x + this.object.config.width, 0);
  }
}
