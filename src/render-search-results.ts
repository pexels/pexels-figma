import { render } from "../node_modules/lit-html/lit-html";
import PexelsAPI from "../node_modules/pexels-api-wrapper/index";
import image from "./image-markup";
import error from "./error-markup";

const pexelsClient = new PexelsAPI(process.env.API_KEY);

const renderSearchResults = (event, markup = []) => {
  // Reset the array
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

export default renderSearchResults;
