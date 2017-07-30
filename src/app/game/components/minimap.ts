import { Component } from '.';

export class Minimap extends Component {
  private readonly x: number;
  private readonly y: number;

  constructor(
    context: CanvasRenderingContext2D,
    config: any,
    entity: any
  ) {
    super(context, config, entity);

    this.x = this.config.pos.x;
    this.y = this.config.pos.y;
  }

  draw(): void {
    const message = `{ x: ${this.entity.pos.x}, y: ${this.entity.pos.y} }`;

    this.context.fillStyle = 'black';
    this.context.font = '8pt sans-serif';
    this.context.textAlign = 'center';
    this.context.fillText(message, this.x, this.y);
  }
}
