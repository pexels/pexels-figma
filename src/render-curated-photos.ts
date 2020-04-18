import { render } from "../node_modules/lit-html/lit-html";
import PexelsAPI from "./libs/pexels-api-wrapper";
import error from "./templates/error";
import loading from "./templates/loading";
import createGalleryMarkup from "./create-gallery-markup";

const pexelsClient = new PexelsAPI(process.env.API_KEY);
const notice = document.getElementById("notice");
const search = <HTMLInputElement>document.getElementById("search");

const randomPage = () => {
  return Math.round(Math.random() * 100);
};

const renderCuratedPhotos = (pageNumber: number = randomPage()) => {
  // Focus and clear the input
  search.value = "";
  search.focus();

  // Render the loading state
  render(loading(), notice);
  // Get a random curated photos page
  pexelsClient
    .getCuratedPhotos(20, pageNumber)
    .then(createGalleryMarkup)
    .catch((err) => {
      render(error(err), notice);
    });
};

export default renderCuratedPhotos;
