import "figma-plugin-ds/figma-plugin-ds.min.js";
import "figma-plugin-ds/figma-plugin-ds.min.css";
import { html, render } from "../node_modules/lit-html/lit-html";
import PexelsAPI from "../node_modules/pexels-api-wrapper/index";
import "./ui.css";

// Pexels API key
const pexelsClient = new PexelsAPI(process.env.API_KEY);
let markup = [];

// The image markup to be rendered
const image = (
  src,
  photographer,
  width: number | string = "auto",
  height: number | string = "auto"
) => {
  return html`
    <li class="gallery__image">
      <img
        src="${src.tiny}"
        alt="Photo by ${photographer}"
        width="${width}"
        height="${height}"
        data-insert-url="${src.large2x}"
      />
    </li>
  `;
};

// Error message markup
const error = (message: string = "There was an error.") => {
  return html` <div class="visual-bell visual-bell--error">
    <span class="visual-bell__msg">${message}</span>
  </div>`;
};

// pexelsClient.getPopularPhotos(10, 1)
fetch("http://localhost:3000/pexels")
  .then((resp) => resp.json())
  .then(function (result) {
    for (const photo of result.photos) {
      markup.push(image(photo.src, photo.photographer, 200));
    }
    render(markup, document.getElementById("photos"));
  })
  .catch(function (e) {
    render(error(e), document.getElementById("error"));
  });

// Send the image to the node
const insert = (event) => {
  // Check which image was clicked
  const large2x = event.path[0].dataset.insertUrl;

  // Fetch the image
  fetch(large2x)
    .then((response) => {
      return response.arrayBuffer();
    })
    .then((buffer) => {
      parent.postMessage(
        { pluginMessage: { type: "insert", data: new Uint8Array(buffer) } },
        "*"
      );
    })
    .catch((err) => {
      render(error(err), document.getElementById("error"));
    });
};

// Event listeners and callbacks
document.getElementById("photos").addEventListener("click", insert);
