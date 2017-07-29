import * as $ from 'jquery';

import { Collidable, Updatable } from '../../core/behaviors';

import { createWith } from '../../infra';
import { store } from '../../infra/data';

import { Entity } from '..';

export abstract class Phase implements Entity, Updatable {
  private readonly entities: Array<Updatable | Collidable> = [];

  constructor(public readonly config: any) {
    $(document).on('entity:add', (_, entity) => this.addEntity(entity));
    $(document).on('entity:remove', (_, entity) => this.removeEntity(entity));
  }

  update(): void {
    this.entities.forEach(entity => {
      const updatable = entity as Updatable;
      if (typeof updatable.update !== 'undefined') {
        updatable.update();
      }

      const collidable = entity as Collidable;
      if (collidable) {
        this.detectsCollision(collidable);
      }
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

  private addEntity(entity: Updatable | Collidable): void {
    if (entity instanceof Collidable) {

    }

    this.entities.push(entity);

    $(this).trigger('entity:added', [entity]);
  }

  private removeEntity(entity: Updatable | Collidable): void {
    const index = this.entities.indexOf(entity);

    delete this.entities[index];

    $(this).trigger('entity:removed', [entity]);
  }

  private detectsCollision(obstacle: Collidable): void {
    this.entities
      .filter(entity => entity instanceof Collidable)
      .map(entity => entity as Collidable)
      .filter(entity => entity !== obstacle && entity.collidedWith(obstacle))
      .forEach(entity => {
        entity.resolvesCollision(obstacle);
        obstacle.resolvesCollision(entity);
      });
  }
}
