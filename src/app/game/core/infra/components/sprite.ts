import { Component } from '.';
import { Img } from './img';
import { Character } from '../../../domain/characters';

export class Sprite extends Img implements Component {
  constructor(
    config: any,
    private character: Character,
    context: CanvasRenderingContext2D
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
      this.object.pos.x,
      this.object.pos.y,
      this.object.config.width,
      this.object.config.height
    );
  }
}
