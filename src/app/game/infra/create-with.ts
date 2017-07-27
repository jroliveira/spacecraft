import { Component, HealthBar, Text } from '../components';
import { Img, Loading, Parallax, Sprite } from '../components/images';

import { Background, MovingBackground } from '../entities/backgrounds';
import { Ship, Soldier } from '../entities/characters';

const types = {
  // entities
  'Background': config => new Background(config),
  'Ship': config => new Ship(config),
  'Soldier': config => new Soldier(config),
  'MovingBackground': config => new MovingBackground(config),

  // components
  'HealthBar': (config, context, entity) => new HealthBar(context, config, entity),
  'Img': (config, context, entity) => new Img(context, config, entity),
  'Loading': (config, context, entity) => new Loading(context, config, entity),
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
