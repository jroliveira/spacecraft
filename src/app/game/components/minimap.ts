import { Entity } from '../entities';

import { Component } from '.';

export class Minimap extends Component<Entity> {
  constructor(
    context: CanvasRenderingContext2D,
    config: any,
    entity: Entity
  ) {
    super(context, config, entity);
  }

  draw(): void {
    const message = `{ x: ${this.entity.pos.x}, y: ${this.entity.pos.y} }`;

    this.context.fillStyle = 'black';
    this.context.font = '8pt sans-serif';
    this.context.textAlign = 'center';
    this.context.fillText(message, this.config.pos.x, this.config.pos.y);
  }
}
