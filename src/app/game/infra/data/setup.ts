import * as $ from 'jquery';
import * as yaml from 'js-yaml'

import { store } from '.';
import { getImage } from '.';

export async function setup(data: any): Promise<void> {
  await data.images
    .forEach(async image => await getImage(image));

  data.resources
    .forEach(async resource => {
      const items = await get(`assets/server/resources/${resource}.yaml`);
      await store.clear(resource);

      items
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
