import { Media } from '@pexels/types';
import { postPluginMessage } from './post-plugin-message';

export async function insertMedia(media: Media) {
  try {
    const data = await (await fetch(media.src)).arrayBuffer();
    postPluginMessage({
      type: 'imageHash',
      message: {
        media,
        data: new Uint8Array(data),
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