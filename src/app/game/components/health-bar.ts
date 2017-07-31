import { Entity } from '../entities';

import { Component } from '.';

export class HealthBar extends Component<Entity> {
  private readonly maxHealth: number;
  private readonly maxWidth: number;

  constructor(
    context: CanvasRenderingContext2D,
    config: any,
    entity: Entity
  ) {
    super(context, config, entity);

    this.maxHealth = this.entity.collidable.health;
    this.maxWidth = this.entity.config.width;
  }

  draw(): void {
    let width = this.entity.config.width + this.config.outer.width;
    this.fill(this.config.outer, width);

    width = this.maxWidth * this.entity.collidable.health / this.maxHealth;
    this.fill(this.config.inner, width);
  }

  private fill(config: any, width: number): void {
    const x = this.entity.pos.x + config.pos.x;
    const y = this.entity.pos.y - config.pos.y;
    const height = config.height;
    const color = config.color;

    this.context.beginPath();
    this.context.rect(x, y, width, height);
    this.context.fillStyle = color;
    this.context.fill();
    this.context.closePath();
  }
}
