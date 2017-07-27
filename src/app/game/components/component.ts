import { Configurable, Drawable } from '../core/behaviors';

export abstract class Component implements Drawable {
  constructor(
    protected readonly context: CanvasRenderingContext2D,
    protected readonly config: any,
    public readonly entity: any
  ) { }

  abstract draw(): void;
}
