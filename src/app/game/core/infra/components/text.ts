import { Component } from '.';

export class Text extends Component {
  constructor(
    config: any,
    private context: CanvasRenderingContext2D
  ) {
    super(config, undefined);
  }

  draw(): void {
    this.context.font = '22pt sans-serif';
    this.context.textAlign = 'center';
    this.context.fillText(this.config.message, (900 / 2), (540 / 2));
  }
}
