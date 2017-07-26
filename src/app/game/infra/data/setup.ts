import * as $ from 'jquery';
import * as yaml from 'js-yaml'

import { store } from '.';
import { getImage } from '.';

const resources: string[] = [
  'projectiles',
  'enemies',
  'characters',
  'objects',
  'backgrounds',
  'phases',
  'scenarios'
];

const images: string[] = [
  'backgrounds/starfield',
  'backgrounds/parallax-a',
  'backgrounds/parallax-b',
  'characters/ship',
  'characters/soldier',
  'enemies/asteroid',
  'projectiles/bullet',
  'projectiles/laser',
  'projectiles/missile',
  'objects/starbase',
  'components/loading'
];

export async function setup(): Promise<void> {
  await Promise.all(images
    .map(async image => await getImage(image)));

  resources
    .forEach(async resource => {
      const data = await get(`assets/server/resources/${resource}.yaml`);
      await store.clear(resource);

      data
        .forEach(async item => await store.add(resource, item));
    });
}

async function get(url: string): Promise<any> {
  return new Promise<any>(resolve => {
    $.ajax({
      cache: false,
      type: 'GET',
      url: url,
      contentType: 'application/x-yaml',

      success: data => {
        const doc = yaml.safeLoad(data);
        resolve(doc);
      },

      error: err => console.log(`Error occurred while loading the resource. ${err}`)
    });
  });
}
