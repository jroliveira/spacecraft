import * as $ from 'jquery';

import { Configurable } from '../../core';
import { store } from '../../core/infra/data';

import { Scenario } from './scenario'
import { Phase } from '../phases/phase';
import { StarbasePhase } from '../phases/starbase-phase';

export class Main extends Scenario {
  constructor(
    config: any,
    context: CanvasRenderingContext2D,
    private phase: Phase
  ) {
    super(config, context);

    $(this.phase).on('addedElement', this.addComponent.bind(this));
    $(this.phase).on('removedElement', this.removeComponent.bind(this));
    $(document).on('phaseEnded', this.changeScenario.bind(this));
  }

  updates(): void {
    this.phase.updates();
  }

  async start(): Promise<void> {
    await this.phase.start();
  }

  private async changeScenario(): Promise<void> {
    let config = await store.get('phases', 'starbase');
    const phase = await Phase.create(config, StarbasePhase);

    config = await store.get('scenarios', 'main');
    const scenario = new Main(config, this.context, phase);

    $(document).trigger('changeScenario', [scenario]);
  }

  private addComponent(_, object: any): void {
    if (!object.config.components) {
      return;
    }

    object.config.components.forEach(config => {
      const component = this.getType(config, object);
      this.components.push(component);
    });
  }

  private removeComponent(_, object: any): void {
    this.components
      .filter(component => component.object === object)
      .forEach(component => {
        const index = this.components.indexOf(component);
        delete this.components[index];
      });
  }
}
