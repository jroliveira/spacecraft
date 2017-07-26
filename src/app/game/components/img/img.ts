import { Component } from '..';

import { getImage } from '../../infra/data';

export class Img extends Component {
  protected loaded = false;
  protected readonly image = new Image();

  constructor(
    readonly config: any,
    readonly entity: any,
    protected readonly context: CanvasRenderingContext2D
  ) {
    super(config, entity);

    this.image.onload = () => this.loaded = true;
    this.load();
  }

  draw(): void {
    if (!this.loaded) {
      return;
    }

    this.context.drawImage(this.image, this.entity.pos.x, this.entity.pos.y);
  }

  private async load(): Promise<void> {
    const base64 = await getImage(this.config.src);
    this.image.src = base64;
  }
}
