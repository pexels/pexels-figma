import { render } from "../node_modules/lit-html/lit-html";
import PexelsAPI from "./pexels-api-wrapper";
import error from "./error-markup";
import loading from "./loading-markup";
import renderPhotos from "./render-photos";

const pexelsClient = new PexelsAPI(process.env.API_KEY);
const notice = document.getElementById("notice");
const photos = document.getElementById("photos");
const controls = document.getElementById("controls");

const renderSearchResults = (event, page = 1, num = 20) => {
  const search = <HTMLInputElement>document.getElementById("search");
  const value = search.value;

  // If it's an enter key press and the value isn't blank
  if (event && event.keyCode == 13 && value != "") {
    // Remove the existing photos
    render([], photos);

    // Remoe the controls in case it's the last page
    render([], controls);
    // Show a loading message
    render(loading(`Searching`), notice);

    // Search for photos
    pexelsClient
      .search(value, num, page)
      .then(renderPhotos)
      .catch((err) => {
        render(error(err), notice);
      });
  }
};

export default renderSearchResults;
