import { html, render } from "../node_modules/lit-html/lit-html";
import image from "./image-markup";
import emptyStateMarkup from "./empty-state-markup";
import renderControls from "./render-controls";
import renderCuratedPhotos from "./render-curated-photos";

const createGalleryPhotos = (result) => {
  let markup = [];
  const photos = document.getElementById("photos");
  const notice = document.getElementById("notice");

  // If there are no results
  if (result.total_results === 0) {
    // Remove the gallery class
    photos.classList.remove("gallery");

    // Render an empty state
    render(emptyStateMarkup(), photos);

    // Remove any notices
    render([], notice);

    // Set the
    document.getElementById("curated").addEventListener("click", () => {
      renderCuratedPhotos();
    });

    // If there are results
  } else {
    // Add the gallery class
    photos.classList.add("gallery");

    // Iterate through each photo
    for (const photo of result.photos) {
      // Add the image markup to the array for rendering
      markup.push(image(photo.src, photo.photographer, 200, 140));
    }

    // Render the photos
    render(markup, photos);

    // Remove any notices
    render([], notice);

    // Render the pagination controls
    renderControls(result);
  }

  return markup;
};

export default createGalleryPhotos;
