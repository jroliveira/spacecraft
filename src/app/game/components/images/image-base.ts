import { Img } from '../../infra';

import { Entity } from '../../entities';

import { Component } from '..';

export abstract class ImageBase<TEntity extends Entity> extends Component<TEntity> {
  protected readonly img: Img;

  constructor(
    context: CanvasRenderingContext2D,
    config: any,
    entity: TEntity
  ) {
    super(context, config, entity);
    this.img = new Img(this.config.src);
  }
}
