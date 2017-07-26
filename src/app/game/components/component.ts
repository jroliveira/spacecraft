import { Configurable, Drawable } from '../core/behaviors';

export abstract class Component implements Configurable, Drawable {
  constructor(
    public readonly config: any,
    public readonly entity: any
  ) { }

  abstract draw(): void;
}
