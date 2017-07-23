import * as $ from 'jquery';

import { store } from '.';
import { getImage } from '.';

const resources: string[] = [
  'projectiles',
  'enemies',
  'characters',
  'entities',
  'backgrounds',
  'effects',
  'phases',
  'scenarios'
];

const images: string[] = [
  'backgrounds_background1.png',
  'parallax_parallax1.png',
  'parallax_parallax2.png',
  'characters_shipSprite.png',
  'characters_soldierSprite.png',
  'enemies_asteroid.png',
  'projectiles_bullet.png',
  'projectiles_laser.png',
  'projectiles_missile.png'
];

export async function setup(): Promise<void> {
  await Promise.all(images
    .map(async image => await getImage(image)));

  resources
    .forEach(async resource => {
      const data = await get(`http://localhost:4000/api/${resource}`);
      await store.clear(resource);

      data
        .forEach(async item => await store.add(resource, item));
    });
}

async function get(url: string): Promise<any> {
  return new Promise<any>(resolve => {
    $.get(url)
      .done(data => resolve(data))
      .fail(err => console.log(err));
  });
}
