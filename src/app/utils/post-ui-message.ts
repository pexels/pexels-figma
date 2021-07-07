import { Media } from '@pexels/types';

export type TPhotoInsertedMessage = {
  type: 'photo-inserted';
}

export type TMediaHistoryChangedMessage = {
  type: 'media-history-changed';
  message: {
    media: Media[];
  };
}

export type TUIMessage = TPhotoInsertedMessage | TMediaHistoryChangedMessage;

export const postUiMessage = (message: TUIMessage) => {
  figma.ui.postMessage(message);
}