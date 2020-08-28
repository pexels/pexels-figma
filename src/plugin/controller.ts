import clone from './clone';

let notification;

// Allows us to cancel notifications instead of queing them
const cancelNotify = (el) => {
  if (typeof el !== 'undefined' && typeof el.cancel === 'function') {
    el.cancel();
  }
};

figma.showUI(__html__, {width: 400, height: 600});

figma.ui.onmessage = (event) => {
  const {type, message} = event;

  // Notice messages
  if (type === 'notice') {
    let timeout = message.timeout || 4000;
    // Cancel any existing message
    cancelNotify(notification);
    // Display a new message
    notification = figma.notify(message.text, {timeout});
  }

  // Image data
  if (type === 'imageHash') {
    const imageHash = figma.createImage(message.data).hash;

    // If no selection
    if (figma.currentPage.selection.length === 0) {
      const rect = figma.createRectangle();

      // Half the size of the image so it looks good on retina
      rect.resizeWithoutConstraints(message.width / 2, message.height / 2);

      // Center the frame in our current viewport so we can see it.
      rect.x = figma.viewport.center.x - message.width / 2;
      rect.y = figma.viewport.center.y - message.height / 2;

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
        let fills = clone(node.fills);
        fills = [{type: 'IMAGE', scaleMode: 'FILL', imageHash}];
        node.fills = fills;
      }
    }

    // Tell the plugin that the image was inserted
    figma.ui.postMessage({type: 'photo-inserted'});
    // Cancel any existing message
    cancelNotify(notification);
    // Display a new message
    notification = figma.notify('Photo Inserted', {timeout: 2000});
  }
};
