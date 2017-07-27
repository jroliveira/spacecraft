import * as $ from 'jquery';

import { store } from '../../infra/data';

import { Scenario } from './scenario'
import { Phase } from '../phases/phase';
import { StarbasePhase } from '../phases/starbase-phase';

export class Main extends Scenario {
  constructor(
    config: any,
    readonly context: CanvasRenderingContext2D,
    private readonly phase: Phase
  ) {
    super(config, context);

    $(this.phase).on('entity:added', this.addedEntity.bind(this));
    $(this.phase).on('entity:removed', this.removedComponent.bind(this));
    $(document).on('phase:ended', this.changeScenario.bind(this));
  }

  update(): void {
    this.phase.update();
  }

  async start(): Promise<void> {
    await super.start();
    await this.phase.start();
  }

  private async changeScenario(): Promise<void> {
    let config = await store.get('phases', 'starbase');
    const phase = await Phase.create(config, StarbasePhase);

    config = await store.get('scenarios', 'main');
    const scenario = new Main(config, this.context, phase);

    $(document).trigger('scenario:change', [scenario]);
  }

  private addedEntity(_, entity: any): void {
    if (!entity.config.components) {
      return;
    }

    entity.config.components.forEach(config => this.addComponent(config, entity));
  }

  private removedComponent(_, entity: any): void {
    this.components
      .filter(component => component.entity === entity)
      .forEach(component => this.removeComponent(component));
  }
}
