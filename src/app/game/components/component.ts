import { Drawable } from '../core/behaviors';

import { Entity } from '../entities';

export abstract class Component<TEntity extends Entity> implements Drawable {
  constructor(
    protected readonly context: CanvasRenderingContext2D,
    protected readonly config: any,
    readonly entity: TEntity
  ) { }

  abstract draw(): void;
}
