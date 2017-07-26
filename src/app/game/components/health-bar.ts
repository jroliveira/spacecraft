import { Component } from '.';

export class HealthBar extends Component {
  private readonly maxHealth: number;
  private readonly maxWidth: number;

  constructor(
    readonly config: any,
    readonly entity: any,
    private readonly context: CanvasRenderingContext2D,
  ) {
    super(config, entity);

    this.maxHealth = this.entity.health;
    this.maxWidth = this.entity.config.width;
  }

  draw(): void {
    let x = this.entity.pos.x;
    let y = this.entity.pos.y - 10;
    let width = this.entity.config.width + 2;
    let height = 5 + 2;
    let color = 'white';

    this.fill(x, y, width, height, color);

    x = this.entity.pos.x + 1;
    y = this.entity.pos.y - 10 + 1;
    width = this.maxWidth * this.entity.health / this.maxHealth;
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
