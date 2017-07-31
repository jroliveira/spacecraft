import * as $ from 'jquery';

import { createWith } from '../../infra';
import { store } from '../../infra/data';

import { Entity } from '..';

export abstract class Phase extends Entity {
  private readonly entities: Entity[] = [];

  constructor(config: any) {
    super(config);

    $(document).on('entity:add', (_, entity) => this.addEntity(entity));
    $(document).on('entity:remove', (_, entity) => this.removeEntity(entity));
  }

  update(): void {
    this.entities.forEach(entity => {
      entity.update();
      this.detectsCollision(entity);
    });
  }

  async start(): Promise<void> {
    if (!this.config.entities) {
      return;
    }

    this.config.entities
      .forEach(async entityConfig => {
        const config = await store.get(entityConfig.resource, entityConfig.id);
        const entity = createWith(config);

        this.addEntity(entity)
      });
  }

  private addEntity(entity: Entity): void {
    this.entities.push(entity);

    $(this).trigger('entity:added', [entity]);
  }

  private removeEntity(entity: Entity): void {
    const index = this.entities.indexOf(entity);

    delete this.entities[index];

    $(this).trigger('entity:removed', [entity]);
  }

  private detectsCollision(obstacle: Entity): void {
    if (!obstacle.collidable) {
      return;
    }

    this.entities
      .filter(entity => entity.collidable)
      .filter(entity => entity !== obstacle && entity.collidable.collidedWith(obstacle))
      .forEach(entity => {
        entity.resolvesCollision(obstacle);
        obstacle.resolvesCollision(entity);
      });
  }
}
