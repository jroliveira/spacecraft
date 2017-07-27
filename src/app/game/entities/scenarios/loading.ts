import * as $ from 'jquery';

import { sleep } from '../../infra';
import { setup, store } from '../../infra/data';

import { Scenario, Start } from '.';

export class Loading extends Scenario {
  constructor(config: any, readonly context: CanvasRenderingContext2D) {
    super(config, context);
  }

  async load(): Promise<void> {
    await sleep(1000);
    await setup();
    await sleep(1000);

    const config = await store.get('scenarios', 'start');
    await sleep(3000);
    const scenario =  new Start(config, this.context);
    $(document).trigger('scenario:change', [scenario]);
  }
}
