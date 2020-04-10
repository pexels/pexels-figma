import { render } from "../node_modules/lit-html/lit-html";
import PexelsAPI from "../node_modules/pexels-api-wrapper/index";
import image from "./image-markup";
import loading from "./loading-markup";
import error from "./error-markup";

const pexelsClient = new PexelsAPI(process.env.API_KEY);

const renderInitialPhotos = (markup = []) => {
  // Get a random page
  const page = Math.round(Math.random() * 100);

  // Render the loading state
  render(loading(), document.getElementById("notice"));
  // Get random popular photos
  pexelsClient
    .getCuratedPhotos(10, page)
    .then(function (result) {
      // Iterate through each photo
      for (const photo of result.photos) {
        // Add the image markup to the array for rendering
        markup.push(image(photo.src, photo.photographer, 200));
      }
      render(markup, document.getElementById("photos"));
      render([], document.getElementById("notice"));
    })
    .catch(function (e) {
      render(error(e), document.getElementById("notice"));
    });
};

export default renderInitialPhotos;
