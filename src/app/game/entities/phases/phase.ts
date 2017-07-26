import * as $ from 'jquery';

import { Collidable, Updatable } from '../../core/behaviors';

import { createWith } from '../../infra';
import { store } from '../../infra/data';

type PhaseType<TPhase> = new (config: any) => TPhase;

export abstract class Phase implements Updatable {
  private readonly entities: Array<Updatable | Collidable> = [];

  static async create<TPhase extends Phase>(config: any, type: PhaseType<TPhase>): Promise<TPhase> {
    return new Promise<TPhase>(async resolve => {
      const phase = new type(config);
      resolve(phase);
    });
  }

  constructor(protected readonly config: any) { }

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
        const config = await store.get(entityConfig.table, entityConfig.id);
        const entity = createWith(config);

        this.addEntity(entity)
      });
  }

  protected addEntity(entity: Updatable | Collidable): void {
    if (entity instanceof Collidable) {
      $(entity).on('destroy', this.removeEntity.bind(this));
    }

    this.entities.push(entity);

    $(this).trigger('entity:added', [entity]);
  }

  private removeEntity(_, entity: Updatable | Collidable): void {
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
