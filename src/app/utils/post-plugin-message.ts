import { Media } from '@pexels/types';

type TNoticeMessage = {
  type: 'notice';
  message: {
    text: string;
    timeout?: number;
  };
}

type TImageHashMessage = {
  type: 'imageHash';
  message: {
    data: Uint8Array;
    media: Media
  };
}

export type TPluginMessage = TNoticeMessage | TImageHashMessage;

export const postPluginMessage = (message: TPluginMessage) => {
  parent.postMessage({
    pluginMessage: message,
  }, '*');
}