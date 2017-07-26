export class Timer {
  private time = 0;

  constructor(private readonly period: number) { }

  get ended(): boolean {
    this.time++;

    if (this.time < this.period) {
      return false;
    }

    this.time = 0;
    return true;
  }
}
