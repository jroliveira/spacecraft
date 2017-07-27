import { Component } from '..';

import { Img } from '../../infra';

export abstract class ImageBase extends Component {
  protected readonly img: Img;

  constructor(
    context: CanvasRenderingContext2D,
    config: any,
    entity: any,
  ) {
    super(context, config, entity);
    this.img = new Img(this.config.src);
  }
}
