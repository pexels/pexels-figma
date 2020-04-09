// Function that creates a rectangle on canvas with an image fill from image data
function addImageToCanvas(data) {
  let imageHash = figma.createImage(data).hash;
  const rect = figma.createRectangle();
  rect.fills = [{ type: "IMAGE", scaleMode: "FIT", imageHash }];
  figma.currentPage.appendChild(rect);

  // select the rectangle and focus the viewport
  figma.currentPage.selection = [rect];
  figma.viewport.scrollAndZoomIntoView([rect]);
}

figma.showUI(__html__, { width: 400, height: 600 });

figma.ui.onmessage = (msg) => {
  if (msg.type === "insert") {
    addImageToCanvas(msg.data);
  }
};
