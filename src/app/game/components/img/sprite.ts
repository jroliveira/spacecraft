import { Character } from '../../entities/characters';

import { Img } from './img';

export class Sprite extends Img {
  constructor(
    readonly config: any,
    private readonly character: Character,
    readonly context: CanvasRenderingContext2D
  ) {
    super(config, character, context);
  }

  private get row(): number {
    return this.character.sprite.row * this.config.height;
  }

  private get col(): number {
    return this.character.sprite.col * this.config.width;
  }

  draw(): void {
    if (this.loaded === false) {
      return;
    }

    this.context.drawImage(
      this.image,
      this.col,
      this.row,
      this.config.width,
      this.config.height,
      this.entity.pos.x,
      this.entity.pos.y,
      this.entity.config.width,
      this.entity.config.height
    );
  }
}
