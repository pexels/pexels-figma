import { render } from "../node_modules/lit-html/lit-html";
import PexelsAPI from "../node_modules/pexels-api-wrapper/index";
import loading from "./loading-markup";
import error from "./error-markup";
import renderPhotos from "./render-photos";

const pexelsClient = new PexelsAPI(process.env.API_KEY);

const renderInitialPhotos = (num = 20) => {
  // Get a random page
  const page = Math.round(Math.random() * 100);

  // Render the loading state
  render(loading(), document.getElementById("notice"));
  // Get random popular photos
  pexelsClient
    .getCuratedPhotos(num, page)
    .then(renderPhotos)
    .catch(function (e) {
      render(error(e), document.getElementById("notice"));
    });
};

export default renderInitialPhotos;
