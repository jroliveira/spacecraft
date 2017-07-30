import { HealthBar, Minimap, Text } from '../components';
import { Img, Loading, Parallax, Sprite } from '../components/images';

import { Background, MovingBackground } from '../entities/backgrounds';
import { Ship, Soldier } from '../entities/characters';
import { Door } from '../entities/objects';
import { FirstPhase } from '../entities/phases/first-phase';
import { StarbasePhase } from '../entities/phases/starbase-phase';

const types = {
  // entities
  'Background': config => new Background(config),
  'MovingBackground': config => new MovingBackground(config),
  'Ship': config => new Ship(config),
  'Soldier': config => new Soldier(config),
  'FirstPhase': config => new FirstPhase(config),
  'StarbasePhase': config => new StarbasePhase(config),
  'Door': config => new Door(config),

  // components
  'HealthBar': (config, context, entity) => new HealthBar(context, config, entity),
  'Img': (config, context, entity) => new Img(context, config, entity),
  'Loading': (config, context, entity) => new Loading(context, config, entity),
  'Minimap': (config, context, entity) => new Minimap(context, config, entity),
  'Parallax': (config, context, entity) => new Parallax(context, config, entity),
  'Sprite': (config, context, entity) => new Sprite(context, config, entity),
  'Text': (config, context, entity) => new Text(context, config, entity)
};

export function createWith(
  config: any,
  context?: CanvasRenderingContext2D,
  entity?: any
): any {
  if (!types.hasOwnProperty(config.type)) {
    throw new Error(`Unconfigured type ${config.type}.`)
  }

  return types[config.type](config, context, entity);
}
