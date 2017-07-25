import * as $ from 'jquery';

import { Collide, Updatable } from '../../core';
import { store } from '../../core/infra/data';
import { Background, MovingBackground, Parallax } from '../../core/backgrounds';

import { Character, Ship, Soldier } from '../characters';

type PhaseType<TPhase> = new (config: any) => TPhase;

export abstract class Phase implements Updatable {
  private readonly objects: any[] = [];
  private _background: Background;
  private _character: Character;

  private _types = {
    'Background': config => new Background(config),
    'Parallax': config => new Parallax(config),
    'Ship': config => new Ship(config),
    'Soldier': config => new Soldier(config),
    'MovingBackground': config => new MovingBackground(config)
  };

  static async create<TPhase extends Phase>(config: any, type: PhaseType<TPhase>): Promise<TPhase> {
    return new Promise<TPhase>(async resolve => {
      const phase = new type(config);
      await phase.configure();

      resolve(phase);
    });
  }

  constructor(protected config: any) { }

  protected get background(): Background {
    return this._background;
  }

  protected get character(): Character {
    return this._character;
  }

  updates(): void {
    this.objects.forEach(object => {
      object.updates();

      if (object instanceof Collide) {
        this.detectsCollision(object);
      }
    });
  }

  async configure(): Promise<void> {
    let config = await store.get('characters', this.config.character.type);
    this._character = this.getType(config);

    config = await store.get('backgrounds', this.config.phase.config);
    this._background = this.getType(config);
  }

  async start(): Promise<void> {
    this.addElement(this.background);
    this.addElement(this.character);

    if (!this.config.entities) {
      return;
    }

    Object
      .keys(this.config.entities)
      .forEach(async key => {
        const entity = this.config.entities[key];
        const config = await store.get('effects', entity.config);
        const element = this.getType(config);

        this.addElement(element)
      });
  }

  protected addElement(element: Updatable): void {
    if (element instanceof Collide) {
      $(element).on('destroy', this.removeElement.bind(this));
    }

    this.objects.push(element);

    $(this).trigger('addedElement', [element]);
  }

  protected getType(config: any): any {
    if (!this._types.hasOwnProperty(config.type)) {
      throw new Error(`Unconfigured type ${config.type}.`)
    }

    return this._types[config.type](config);
  }

  private removeElement(_, element: Updatable): void {
    const index = this.objects.indexOf(element);

    delete this.objects[index];

    $(this).trigger('removedElement', [element]);
  }

  private detectsCollision(obstacle: Collide): void {
    this.objects
      .filter(element => element instanceof Collide)
      .map(element => element as Collide)
      .filter(object => object !== obstacle && object.collidedWith(obstacle))
      .forEach(object => {
        object.resolvesCollision(obstacle);
        obstacle.resolvesCollision(object);
      });
  }
}
