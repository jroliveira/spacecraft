import * as $ from 'jquery';

import { sleep } from './infra';
import { Input, Keyboard } from './infra/inputs';
import { store } from './infra/data';

import { Loading } from './entities/scenarios/loading';
import { Scenario } from './entities/scenarios/scenario';
import { Start } from './entities/scenarios/start';

export class Game {
  private input: Input = new Keyboard();
  private scenario: Scenario;

  constructor(private context: CanvasRenderingContext2D) {
    this.initialize();

    $(document).on('scenario:change', (_, scenario) => this.changeScenario(scenario));
  }

  private async initialize(): Promise<void> {
    this.input.bind();
    await store.initialize();

    const config = await store.get('scenarios', 'loading');
    const scenario = new Loading(config, this.context);
    await this.changeScenario(scenario);

    this.scenarioLoop();

    await scenario.load();
  }

  private scenarioLoop(): void {
    window.requestAnimationFrame(() => this.scenarioLoop());

    this.scenario.update();
    this.scenario.draw();
  }

  private async changeScenario(scenario: Scenario): Promise<void> {
    this.scenario = scenario;
    await this.scenario.start();
  }
}
