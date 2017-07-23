import * as $ from 'jquery';

import { sleep } from '../../core/infra';
import { store } from '../../core/infra/data';
import { Text } from '../../core/infra/components';

import { Main, Scenario } from '../scenarios';
import { FirstPhase } from '../phases/first-phase';
import { Phase } from '../phases/phase';

export class Start extends Scenario {
  constructor(config: any, context: CanvasRenderingContext2D) {
    super(config, context);
    $(document).on('enter', this.changeScenario.bind(this));
  }

  updates(): void { }

  async start(): Promise<void> {
    const config = { message: 'Press ENTER to start the game.', pos: { x: 50, y: 50 } };
    const component = new Text(config, this.context);

    this.components.push(component);
  }

  private async changeScenario(_, pressed: boolean): Promise<void> {
    if (!pressed) {
      return;
    }

    await sleep(1000);

    let config = await store.get('phases', 'first');
    const phase = await Phase.create(config, FirstPhase);

    config = await store.get('scenarios', 'main');
    const scenario = new Main(config, this.context, phase);

    $(document).trigger('changeScenario', [scenario]);
  }
}
