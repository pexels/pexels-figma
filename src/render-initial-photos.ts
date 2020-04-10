import { render } from "../node_modules/lit-html/lit-html";
import PexelsAPI from "../node_modules/pexels-api-wrapper/index";
import image from "./image-markup";
import error from "./error-markup";

const pexelsClient = new PexelsAPI(process.env.API_KEY);

const renderInitialPhotos = (markup = []) => {
  // Get a random page
  const page = Math.round(Math.random() * 100);
  // Get random popular photos
  pexelsClient
    .getCuratedPhotos(10, page)
    .then(function (result) {
      for (const photo of result.photos) {
        markup.push(image(photo.src, photo.photographer, 200));
      }
      render(markup, document.getElementById("photos"));
    })
    .catch(function (e) {
      render(error(e), document.getElementById("error"));
    });
};

export default renderInitialPhotos;
