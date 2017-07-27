import * as $ from 'jquery';

import { store } from '../../infra/data';

import { Main, Scenario } from '../scenarios';
import { FirstPhase } from '../phases/first-phase';
import { Phase } from '../phases/phase';

export class Start extends Scenario {
  constructor(config: any, readonly context: CanvasRenderingContext2D) {
    super(config, context);
    $(document).on('command:enter', this.changeScenario.bind(this));
  }

  private async changeScenario(_, pressed: boolean): Promise<void> {
    if (!pressed) {
      return;
    }

    let config = await store.get('phases', 'first');
    const phase = await Phase.create(config, FirstPhase);

    config = await store.get('scenarios', 'main');
    const scenario = new Main(config, this.context, phase);

    $(document).trigger('scenario:change', [scenario]);
  }
}
