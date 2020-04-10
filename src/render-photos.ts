import { render } from "../node_modules/lit-html/lit-html";
import image from "./image-markup";
import error from "./error-markup";
import renderControls from "./render-controls";

const renderPhotos = (result) => {
  let markup = [];

  // Render the pagination controls
  renderControls(result);

  if (result.total_results === 0) {
    // Remove any notices
    // TODO Create an empty state
    render(error("No results"), document.getElementById("notice"));
  } else {
    // Iterate through each photo
    for (const photo of result.photos) {
      // Add the image markup to the array for rendering
      markup.push(image(photo.src, photo.photographer, 200, 140));
    }

    // Render the photos
    render(markup, document.getElementById("photos"));

    // Remove any notices
    render([], document.getElementById("notice"));
  }

  return markup;
};

export default renderPhotos;
