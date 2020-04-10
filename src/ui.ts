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
        data-insert-url="${src.original}"
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

// Get random popular photos
pexelsClient
  .getPopularPhotos(10, Math.random() * 1000)
  .then(function (result) {
    for (const photo of result.photos) {
      markup.push(image(photo.src, photo.photographer, 200));
    }
    render(markup, document.getElementById("photos"));
  })
  .catch(function (e) {
    render(error(e), document.getElementById("error"));
  });

const search = (event) => {
  console.log(event);
  // Reset the array0p-x
  let markup = [];
  if (event && event.keyCode == 13) {
    // Get the input value
    const value = event.path[0].value;
    let page = 1;
    // Search for photos
    pexelsClient
      .search(value, 10, page)
      .then(function (result) {
        for (const photo of result.photos) {
          markup.push(image(photo.src, photo.photographer, 200));
        }
        render(markup, document.getElementById("photos"));
      })
      .catch(function (e) {
        render(error(e), document.getElementById("error"));
      });
  }
};

// Send the image to the node
const insert = (event) => {
  // Check which image was clicked
  const url = event.path[0].dataset.insertUrl;

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
      })
      .catch((err) => {
        render(error(err), document.getElementById("error"));
      });
  };
  img.src = url;
};

// Event listeners and callbacks
document.getElementById("photos").addEventListener("click", insert);
document.getElementById("search").addEventListener("keyup", search);
