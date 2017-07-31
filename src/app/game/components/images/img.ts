import { Entity } from '../../entities';

import { ImageBase } from '.';

export class Img extends ImageBase<any> {
  constructor(
    context: CanvasRenderingContext2D,
    config: any,
    _,
  ) {
    super(context, config, _);
  }

  draw(): void {
    if (!this.img.loaded) {
      return;
    }

    this.context.drawImage(this.img.value, this.entity.pos.x, this.entity.pos.y);
  }
}
