import { Component } from '.';
import { Collide } from '../..';
import { getImage } from '../data';

export class Img extends Component {
  protected loaded = false;
  protected image = new Image();

  constructor(
    config: any,
    object: any,
    protected context: CanvasRenderingContext2D
  ) {
    super(config, object);

    this.image.onload = () => this.loaded = true;
    this.load();
  }

  draw(): void {
    if (!this.loaded) {
      return;
    }

    this.context.drawImage(this.image, this.object.pos.x, this.object.pos.y);
  }

  private async load(): Promise<void> {
    const base64 = await getImage(this.config.src);
    this.image.src = base64;
  }
}
