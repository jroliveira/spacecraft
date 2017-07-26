import * as $ from 'jquery';

import { sleep } from './infra';
import { Input, Keyboard } from './infra/inputs';
import { store, setup } from './infra/data';

import { Loading } from './entities/scenarios/loading';
import { Scenario } from './entities/scenarios/scenario';
import { Start } from './entities/scenarios/start';

export class Game {
  private input: Input = new Keyboard();
  private scenario: Scenario;
  private loadingConfig: any;
  private startConfig: any;

  constructor(private context: CanvasRenderingContext2D) {
    this.initialize();

    $(document).on('scenario:change', this.changeScenario.bind(this));
  }

  private async initialize(): Promise<void> {
    this.input.bind();

    await sleep(1000);
    await store.initialize();
    await setup();
    await sleep(1000);

    this.loadingConfig = await store.get('scenarios', 'loading');
    this.startConfig = await store.get('scenarios', 'start');

    this.changeScenario(null, new Loading(this.loadingConfig, this.context));
    this.scenarioLoop();
    await sleep(3000);

    this.changeScenario(null, new Start(this.startConfig, this.context));
  }

  private scenarioLoop(): void {
    window.requestAnimationFrame(() => this.scenarioLoop());

    this.scenario.update();
    this.scenario.draw();
  }

  private changeScenario(_, newScenario: Scenario): void {
    this.scenario = newScenario;
    this.scenario.start();
  }
}
