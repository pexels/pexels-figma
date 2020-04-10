import addImageToCanvas from "./add-image-to-canvas";

// Show the plugin UI
figma.showUI(__html__, { width: 400, height: 600 });

// Monitor messages from the UI
figma.ui.onmessage = (msg) => {
  if (msg.type === "insert") {
    addImageToCanvas(msg);
  }
};
