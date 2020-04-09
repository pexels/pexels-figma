import clone from "./clone";

// Function that creates a rectangle on canvas with an image fill from image data
function addImageToCanvas({ width, height, data }) {
  // If current selection
  // Copy the selected node array
  // Apply the image as the fill

  // If no selection
  // Get the width and height of the image
  // Create rectangle at 1/2 of that width/height
  // Apply the image as the fill
  // rect.fills = [{ type: "IMAGE", scaleMode: "FILL", imageHash }];

  const imageHash = figma.createImage(data).hash;
  const rect = figma.createRectangle();

  // Halfthe soze of the image so it looks good on retina
  rect.resizeWithoutConstraints(width / 2, height / 2);

  // Center the frame in our current viewport so we can see it.
  rect.x = figma.viewport.center.x - width / 2;
  rect.y = figma.viewport.center.y - height / 2;

  rect.fills = [{ type: "IMAGE", scaleMode: "FILL", imageHash }];
  figma.currentPage.appendChild(rect);

  // select the rectangle and focus the viewport
  figma.currentPage.selection = [rect];
  figma.viewport.scrollAndZoomIntoView([rect]);
}

figma.showUI(__html__, { width: 400, height: 600 });

figma.ui.onmessage = (msg) => {
  if (msg.type === "insert") {
    addImageToCanvas(msg);
  }
};
