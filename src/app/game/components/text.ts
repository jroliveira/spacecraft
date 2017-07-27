import { Component } from '.';

export class Text extends Component {
  constructor(
    context: CanvasRenderingContext2D,
    config: any,
    entity: any
  ) {
    super(context, config, entity);
  }

  draw(): void {
    const x = this.entity.config.canvas.width / 2;
    const y = this.entity.config.canvas.height / 2;

    this.context.font = '22pt sans-serif';
    this.context.textAlign = 'center';
    this.context.fillText(this.config.message, x, y);
  }
}
