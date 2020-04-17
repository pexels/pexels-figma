import { render } from "../node_modules/lit-html/lit-html";
import PexelsAPI from "./pexels-api-wrapper";
import error from "./error-markup";
import loading from "./loading-markup";
import createGalleryMarkup from "./create-gallery-markup";

const pexelsClient = new PexelsAPI(process.env.API_KEY);
const notice = document.getElementById("notice");
const photos = document.getElementById("photos");
const controls = document.getElementById("controls");

const renderSearchResults = (pageNmber = 1) => {
  const search = <HTMLInputElement>document.getElementById("search");
  const value = search.value;

  // If the value isn't blank
  if (value != "") {
    // Remove the existing photos
    render([], photos);

    // Remoe the controls in case it's the last page
    render([], controls);
    // Show a loading message
    render(loading(`Searching`), notice);

    // Search for photos
    pexelsClient
      .search(value, 20, pageNmber)
      .then(createGalleryMarkup)
      .catch((err) => {
        render(error(err), notice);
      });
  }
};

export default renderSearchResults;
