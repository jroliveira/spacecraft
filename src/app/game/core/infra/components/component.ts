export abstract class Component {
  constructor(
    public config: any,
    public object: any
  ) { }

  abstract draw(): void;
}
