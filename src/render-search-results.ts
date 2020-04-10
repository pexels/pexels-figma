import { render } from "../node_modules/lit-html/lit-html";
import PexelsAPI from "../node_modules/pexels-api-wrapper/index";
import image from "./image-markup";
import error from "./error-markup";
import loading from "./loading-markup";

const pexelsClient = new PexelsAPI(process.env.API_KEY);

const renderSearchResults = (event, markup = [], page = 1) => {
  // Get the input value
  const value = event.path[0].value;

  // Reset the array
  if (event && event.keyCode == 13 && value != null) {
    // Show a loading message
    render(
      loading(`Loading ${value} Photos`),
      document.getElementById("notice")
    );
    // Remove the existing photos
    render([], document.getElementById("photos"));

    // Search for photos
    pexelsClient
      .search(value, 10, page)
      .then(function (result) {
        console.log(result);

        for (const photo of result.photos) {
          markup.push(image(photo.src, photo.photographer, 200));
        }
        render(markup, document.getElementById("photos"));
        render([], document.getElementById("notice"));
      })
      .catch(function (e) {
        render(error(e), document.getElementById("error"));
      });
  }
};

export default renderSearchResults;
