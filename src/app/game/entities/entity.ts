import { Collidable, Configurable, Updatable } from '../core/behaviors';

import { Component } from '../components';

import { createWith } from '../infra';

export interface Entity extends Configurable {
  readonly config: any;
}

export class EntityImpl implements Configurable, Updatable {
  protected readonly components: Component[] = [];

  constructor(
    public readonly config: any,
    private readonly context: CanvasRenderingContext2D
  ) {
    this.initialize();
  }

  update(): void {
    this.components.forEach(component => component.draw());
  }

  private async initialize(): Promise<void> {
    if (!this.config.components) {
      return;
    }

    this.config.components.forEach(config => {
      const component = createWith(config, this.context, this);
      this.components.push(component);
    });
  }
}
