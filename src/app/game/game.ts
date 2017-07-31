import * as $ from 'jquery';

import { sleep, createWith } from './infra';
import { Input, Keyboard } from './infra/inputs';
import { store, setup } from './infra/data';

import { Loading } from './entities/scenarios/loading';
import { Scenario } from './entities/scenarios/scenario';
import { Main } from './entities/scenarios/main';

import { Phase } from './entities/phases/phase';
import { FirstPhase } from './entities/phases/first-phase';

const data = {
  resources: [
    'projectiles',
    'enemies',
    'characters',
    'objects',
    'backgrounds',
    'phases',
    'scenarios'
  ],
  images: []
}

export class Game {
  private readonly input: Input = new Keyboard();
  private scenario: Scenario;

  constructor(private context: CanvasRenderingContext2D) {
    this.initialize();
    this.input.bind();

    $(document).on('scenario:change', this.changeScenario.bind(this));
    $(document).on('scenario:load', this.loadScenario.bind(this));
  }

  private async initialize(): Promise<void> {
    await store.initialize();
    await setup(data);

    this.scenarioLoop();

    await this.loadScenario(undefined, 'first');
  }

  private scenarioLoop(): void {
    window.requestAnimationFrame(() => this.scenarioLoop());

    if (!this.scenario) {
      return;
    }

    this.scenario.update();
    this.scenario.draw();
  }

  private changeScenario(_, newScenario: Scenario): void {
    this.scenario = newScenario;
    this.scenario.start();
  }

  private async loadScenario(_, scenario: string): Promise<void> {
    const loadingConfig = await store.get('scenarios', 'loading');
    this.changeScenario(undefined, new Loading(loadingConfig, this.context));
    await sleep(1000);

    const scenarioConfig = await store.get('scenarios', scenario);
    const phaseConfig = await store.get('phases', scenarioConfig.phase.name);
    const phase = createWith(phaseConfig);

    await setup(scenarioConfig.setup);

    this.changeScenario(undefined, new Main(scenarioConfig, this.context, phase));
  }
}
