import { render } from "../node_modules/lit-html/lit-html";
import error from "./error-markup";
import loading from "./loading-markup";

// Send the image to the node
const insert = (event) => {
  // Check which image was clicked
  const url = event.path[0].dataset.insertUrl;

  // Show a loading message
  render(loading("Inserting Photo"), document.getElementById("notice"));

  // Get the dimentsion of the image
  const img = new Image();

  img.onload = () => {
    // Fetch the image
    fetch(url)
      .then((response) => {
        return response.arrayBuffer();
      })
      .then((buffer) => {
        // Send data to the pligin code
        parent.postMessage(
          {
            pluginMessage: {
              type: "insert",
              data: new Uint8Array(buffer),
              width: img.naturalWidth,
              height: img.naturalHeight,
            },
          },
          "*"
        );
        render([], document.getElementById("notice"));
      })
      .catch((err) => {
        render(error(err), document.getElementById("error"));
      });
  };
  img.src = url;
};

export default insert;
