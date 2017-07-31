import { Character } from '../../entities/characters';

import { ImageBase } from '.';

export class Sprite extends ImageBase<Character> {
  constructor(
    context: CanvasRenderingContext2D,
    config: any,
    entity: Character
  ) {
    super(context, config, entity);
  }

  private get row(): number {
    return this.entity.sprite.row * this.config.height;
  }

  private get col(): number {
    return this.entity.sprite.col * this.config.width;
  }

  draw(): void {
    if (this.img.loaded === false) {
      return;
    }

    this.context.drawImage(
      this.img.value,
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
