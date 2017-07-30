import * as $ from 'jquery';

import { createWith } from '../../infra';
import { store } from '../../infra/data';

import { Scenario } from './scenario'
import { Phase } from '../phases/phase';
import { StarbasePhase } from '../phases/starbase-phase';

export class Main extends Scenario {
  constructor(
    config: any,
    context: CanvasRenderingContext2D,
    private readonly phase: Phase
  ) {
    super(config, context);

    $(this.phase).on('entity:added', this.addedEntity.bind(this));
    $(this.phase).on('entity:removed', this.removedEntity.bind(this));
  }

  update(): void {
    this.phase.update();
  }

  async start(): Promise<void> {
    await super.start();
    await this.phase.start();
  }

  private addedEntity(_, entity: any): void {
    if (!entity.config.components) {
      return;
    }

    entity.config.components.forEach(config => this.addComponent(config, entity));
  }

  private removedEntity(_, entity: any): void {
    this.components
      .filter(component => component.entity === entity)
      .forEach(component => this.removeComponent(component));
  }
}
