import "figma-plugin-ds/figma-plugin-ds.min.css";
import insert from "./send-image-data";
import renderCuratedPhotos from "./render-curated-photos";
import renderSearchResults from "./render-search-results";
import nextPage from "./next-page";
import "./ui.css";

// Render the photos when first opened
renderCuratedPhotos(20);

// Event listeners and callbacks
document.getElementById("photos").addEventListener("click", insert);
document.getElementById("controls").addEventListener("click", nextPage);
document.getElementById("search").addEventListener("keyup", (event) => {
  if (event && event.keyCode == 13) {
    renderSearchResults(1);
  }
});
