export class Position {
  constructor(
    private _x: number,
    private _y: number
  ) { }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  lift(speed: number): void {
    this._y -= speed;
  }

  lower(speed: number): void {
    this._y += speed;
  }

  toLeft(speed: number): void {
    this._x -= speed;
  }

  toRight(speed: number): void {
    this._x += speed;
  }

  reset(x: number, y: number) {
    this._x = x;
    this._y = y;
  }
}
