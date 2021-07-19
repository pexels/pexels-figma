import { Media } from '@pexels/types';
import { postPluginMessage } from './post-plugin-message';

export async function insertMultipleMedia(media: Media[]) {
  try {
    const images = await Promise.all(media.map(async (entry) => {
      return await (await fetch(entry.src)).arrayBuffer();
    }));
    postPluginMessage({
      type: 'insert-images',
      message: {
        images: images.map((image, index) => ({
          media: media[index],
          data: new Uint8Array(image),
        })),
      },
    });
  } catch (err) {
    console.error(err);
    postPluginMessage({
      type: 'notice',
      message: {
        text: String(err.message),
      },
    });
  }
}