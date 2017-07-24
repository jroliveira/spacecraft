import { Component } from '.';
import { Collide } from '../..';

export class HealthBar extends Component {
  private maxHealth: number;
  private maxWidth: number;

  constructor(
    config: any,
    object: any,
    private context: CanvasRenderingContext2D,
  ) {
    super(config, object);

    this.maxHealth = this.object.health;
    this.maxWidth = this.object.config.width;
  }

  draw(): void {
    let x = this.object.pos.x;
    let y = this.object.pos.y - 5;
    let width = this.object.config.width + 2;
    let height = 5 + 2;
    let color = 'white';

    this.fill(x, y, width, height, color);

    x = this.object.pos.x + 1;
    y = this.object.pos.y - 5 + 1;
    width = this.maxWidth * this.object.health / this.maxHealth;
    height = 5;
    color = 'red';

    this.fill(x, y, width, height, color);
  }

  private fill(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ): void {
    this.context.beginPath();
    this.context.rect(x, y, width, height);
    this.context.fillStyle = color;
    this.context.fill();
    this.context.closePath();
  }
}
