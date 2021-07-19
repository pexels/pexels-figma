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

export type TSelectionChangedMessage = {
  type: 'selection-changed';
  message: {
    nodes: {
      id: string;
      name: string;
    }[];
  }
}

export type TUIMessage = TPhotoInsertedMessage | TMediaHistoryChangedMessage | TSelectionChangedMessage;

export const postUiMessage = (message: TUIMessage) => {
  figma.ui.postMessage(message);
}