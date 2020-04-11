import { render } from "../node_modules/lit-html/lit-html";
import PexelsAPI from "./pexels-api-wrapper";
import error from "./error-markup";
import loading from "./loading-markup";
import renderPhotos from "./render-photos";

const pexelsClient = new PexelsAPI(process.env.API_KEY);
const notice = document.getElementById("notice");
const search = <HTMLInputElement>document.getElementById("search");

const renderInitialPhotos = (num: number = 20) => {
  // Get a random page
  const page = Math.round(Math.random() * 100);

  // Focus and clear the input
  search.value = "";
  search.focus();

  // Render the loading state
  render(loading(), notice);
  // Get a random curated photos page
  pexelsClient
    .getCuratedPhotos(num, page)
    .then(renderPhotos)
    .catch((err) => {
      render(error(err), notice);
    });
};

export default renderInitialPhotos;
