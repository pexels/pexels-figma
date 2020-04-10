import { render } from "../node_modules/lit-html/lit-html";
import PexelsAPI from "../node_modules/pexels-api-wrapper/index";
import error from "./error-markup";
import loading from "./loading-markup";
import renderPhotos from "./render-photos";

const pexelsClient = new PexelsAPI(process.env.API_KEY);

const renderSearchResults = (event, page = 1, num = 20) => {
  // Get the input value
  const value = (<HTMLInputElement>document.getElementById("search")).value;

  // If it's an enter key press
  if (event && event.keyCode == 13 && value != null) {
    // Show a loading message
    render(loading(`Searching`), document.getElementById("notice"));

    // Remove the existing photos
    render([], document.getElementById("photos"));

    // Search for photos
    pexelsClient
      .search(value, num, page)
      .then(renderPhotos)
      .catch(function (e) {
        render(error(e), document.getElementById("error"));
      });
  }
};

export default renderSearchResults;
