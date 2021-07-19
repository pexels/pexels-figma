import { Media } from '@pexels/types';

type TNoticeMessage = {
  type: 'notice';
  message: {
    text: string;
    timeout?: number;
  };
}

type TInsertImagesMessage = {
  type: 'insert-images';
  message: {
    images: {
      data: Uint8Array;
      media: Media;
    }[];
  }
}

export type TPluginMessage = TNoticeMessage | TInsertImagesMessage;

export const postPluginMessage = (message: TPluginMessage) => {
  parent.postMessage({
    pluginMessage: message,
  }, '*');
}