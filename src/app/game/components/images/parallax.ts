import { ImageBase } from '.';

export class Parallax extends ImageBase {
  constructor(
    context: CanvasRenderingContext2D,
    config: any,
    entity: any
  ) {
    super(context, config, entity);
  }

  draw(): void {
    if (!this.img.loaded) {
      return;
    }

    this.context.drawImage(this.img.value, this.entity.pos.x, 0);
    this.context.drawImage(this.img.value, this.entity.pos.x + this.entity.config.width, 0);
  }
}
