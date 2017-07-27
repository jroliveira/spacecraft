import { Drawable, Updatable } from '../../core/behaviors';

import { createWith } from '../../infra';

import { Component } from '../../components';

import { Entity } from '..';

export abstract class Scenario implements Entity, Drawable, Updatable {
  protected readonly components: Component[] = [];

  constructor(
    public readonly config: any,
    protected readonly context: CanvasRenderingContext2D
  ) { }

  draw(): void {
    this.context.clearRect(0, 0, this.config.canvas.width, this.config.canvas.height);
    this.components.forEach(component => component.draw());
  }

  update(): void { }

  async start(): Promise<void> {
    if (!this.config.components) {
      return;
    }

    this.config.components.forEach(config => this.addComponent(config, this));
  }

  protected addComponent(config: any, entity: any): void {
    const component = createWith(config, this.context, entity);
    this.components.push(component);
  }

  protected removeComponent(component: Component): void {
    const index = this.components.indexOf(component);
    delete this.components[index];
  }
}
