import { Media } from '@pexels/types';
import { TPluginMessage } from '../app/utils/post-plugin-message';
import { postUiMessage } from '../app/utils/post-ui-message';
import { PluginDataKeys } from '../constants';

let notification: ReturnType<typeof figma['notify']> | null = null;

// Allows us to cancel notifications instead of queing them
const cancelNotify = (el: typeof notification) => {
  if (el) el.cancel();
};

figma.showUI(__html__, { width: 480, height: 620 });

let mediaHistory = JSON.parse(figma.root.getPluginData(PluginDataKeys.MEDIA_HISTORY) || '[]') as Media[];
postUiMessage({ type: 'media-history-changed', message: { media: mediaHistory } });

figma.ui.onmessage = (event: TPluginMessage) => {
  // Notice messages
  if (event.type === 'notice') {
    const { message } = event;
    let timeout = message.timeout || 4000;
    // Cancel any existing message
    cancelNotify(notification);
    // Display a new message
    notification = figma.notify(message.text, {timeout});
  }

  // Image data
  if (event.type === 'imageHash') {
    const message = event.message;

    mediaHistory = mediaHistory.filter(m => m.id !== message.media.id).slice(0, 50);
    mediaHistory.push(message.media);
    figma.root.setPluginData(PluginDataKeys.MEDIA_HISTORY, JSON.stringify(mediaHistory));
    postUiMessage({ type: 'media-history-changed', message: { media: mediaHistory } });

    const imageHash = figma.createImage(message.data).hash;

    // If no selection
    if (figma.currentPage.selection.length === 0) {
      const rect = figma.createRectangle();
      rect.name = `Pexels Photo by ${message.media.user.name}`;

      // Half the size of the image so it looks good on retina
      rect.resizeWithoutConstraints(message.media.size.width / 2, message.media.size.height / 2);

      // Center the frame in our current viewport so we can see it.
      rect.x = figma.viewport.center.x - message.media.size.width / 2;
      rect.y = figma.viewport.center.y - message.media.size.height / 2;

      // Use FILL so it can be resized
      rect.fills = [{type: 'IMAGE', scaleMode: 'FILL', imageHash}];

      // Add the image to the page
      figma.currentPage.appendChild(rect);

      // select the rectangle and focus the viewport
      figma.currentPage.selection = [rect];
      figma.viewport.scrollAndZoomIntoView([rect]);
    }

    // If there's a selection, add the image data to each
    for (const node of figma.currentPage.selection) {
      if ('fills' in node) {
        const imagePaint: Paint = { type: 'IMAGE', scaleMode: 'FILL', imageHash };
        node.fills = (node.fills === figma.mixed) ? [imagePaint] : [...node.fills, imagePaint];
      }
    }

    // Tell the plugin that the image was inserted
    postUiMessage({ type: 'photo-inserted' });
    // Cancel any existing message
    cancelNotify(notification);
    // Display a new message
    notification = figma.notify('Photo Inserted', {timeout: 2000});
  }
};
