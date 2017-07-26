import { Loader } from '../../components';

import { Scenario } from '.';

export class Loading extends Scenario {
  constructor(config: any, readonly context: CanvasRenderingContext2D) {
    super(config, context);
  }

  update(): void {
    this.components
      .filter(component => component instanceof Loader)
      .map(component => component as Loader)
      .forEach(loader => loader.updates());
  }

  async start(): Promise<void> {
    this.components.push(new Loader(this.context));
  }
}
