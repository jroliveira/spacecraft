import { getImage } from '../infra/data';

export class Img {
  private _loaded = false;
  readonly value = new Image();

  constructor(image: string) {
    this.value.onload = () => this._loaded = true;
    this.initialize(image);
  }

  get loaded(): boolean {
    return this._loaded;
  }

  private async initialize(image: string): Promise<void> {
    const base64 = await getImage(image);
    this.value.src = base64;
  }
}
