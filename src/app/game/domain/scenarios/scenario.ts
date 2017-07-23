import { Configurable, Updatable } from '../../core';
import { Component, HealthBar, Img, ImgContinuous, Sprite } from '../../core/infra/components';

export abstract class Scenario implements Updatable {
  private types = {
    'HealthBar': (config, object) => new HealthBar(config, object, this.context),
    'Img': (config, object) => new Img(config, object, this.context),
    'ImgContinuous': (config, object) => new ImgContinuous(config, object, this.context),
    'Sprite': (config, object) => new Sprite(config, object, this.context)
  };

  protected components: Component[] = [];

  constructor(
    private config: any,
    protected context: CanvasRenderingContext2D
  ) { }

  draw(): void {
    this.context.clearRect(0, 0, this.config.canvas.width, this.config.canvas.height);
    this.components.forEach(component => component.draw());
  }

  abstract updates(): void;

  async abstract start(): Promise<void>;

  protected getType(config: any, object: Configurable): Component {
    if (!this.types.hasOwnProperty(config.type)) {
      throw new Error(`Unconfigured type ${config.type}.`)
    }

    return this.types[config.type](config, object);
  }
}
