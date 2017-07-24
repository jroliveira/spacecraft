import { Component } from '.';

export class Text extends Component {
  constructor(
    config: any,
    private context: any
  ) {
    super(config, undefined);
  }

  draw(): void {
    this.context.font = '22pt sans-serif';
    this.context.textAlign = 'center';
    this.context.fillText(this.config.message, (1170 / 2), (600 / 2));
  }
}
