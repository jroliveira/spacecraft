import * as $ from 'jquery';

const images: any = {};

export async function getImage(image): Promise<any> {
  return new Promise<any>(resolve => {
    if (images[image]) {
      return resolve(images[image]);
    }

    $.ajax({
      cache: false,
      type: 'GET',
      url: `assets/server/images/${image}.json`,
      contentType: 'application/json',
      dataType: 'json',

      success: data => {
        images[image] = `data:image/png;base64,${data.base64}`;
        return resolve(images[image]);
      },

      error: err => console.log(`Error occurred while loading the image. ${err}`)
    });
  });
}
