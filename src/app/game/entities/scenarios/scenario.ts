import { Updatable } from '../../core/behaviors';

import { Component } from '../../components';

export abstract class Scenario implements Updatable {
  protected readonly components: Component[] = [];

  constructor(
    private readonly config: any,
    protected readonly context: CanvasRenderingContext2D
  ) { }

  draw(): void {
    this.context.clearRect(0, 0, this.config.canvas.width, this.config.canvas.height);
    this.components.forEach(component => component.draw());
  }

  abstract update(): void;

  async abstract start(): Promise<void>;
}
