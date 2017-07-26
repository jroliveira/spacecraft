import { Component, HealthBar } from '../components';
import { Img, ImgContinuous, Sprite } from '../components/img';

import { Background, MovingBackground } from '../entities/backgrounds';
import { Ship, Soldier } from '../entities/characters';

const types = {
  // entities
  'Background': config => new Background(config),
  'Ship': config => new Ship(config),
  'Soldier': config => new Soldier(config),
  'MovingBackground': config => new MovingBackground(config),

  // components
  'HealthBar': (config, context, entity) => new HealthBar(config, entity, context),
  'Img': (config, context, entity) => new Img(config, entity, context),
  'ImgContinuous': (config, context, entity) => new ImgContinuous(config, entity, context),
  'Sprite': (config, context, entity) => new Sprite(config, entity, context)
};

export function createWith(config: any, context?: CanvasRenderingContext2D, entity?: any): any {
  if (!types.hasOwnProperty(config.type)) {
    throw new Error(`Unconfigured type ${config.type}.`)
  }

  return types[config.type](config, context, entity);
}
