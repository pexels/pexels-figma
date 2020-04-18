import clone from './clone';

figma.showUI(__html__, {width: 400, height: 600});

figma.ui.onmessage = ({type, width, height, data}) => {
  if (type === 'imageHash') {
    const imageHash = figma.createImage(data).hash;

    // If no selection
    if (figma.currentPage.selection.length === 0) {
      // figma.notify('Nothing selected.');
      const rect = figma.createRectangle();

      // Halfthe soze of the image so it looks good on retina
      rect.resizeWithoutConstraints(width / 2, height / 2);

      // Center the frame in our current viewport so we can see it.
      rect.x = figma.viewport.center.x - width / 2;
      rect.y = figma.viewport.center.y - height / 2;

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

    // Send a message back to the UI
    figma.ui.postMessage({
      type: 'create-rectangles',
      message: `Inserted a ${width}x${height} image.`,
    });
  }
};
