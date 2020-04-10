import "figma-plugin-ds/figma-plugin-ds.min.css";
import insert from "./insert";
import renderInitialPhotos from "./render-initial-photos";
import renderSearchResults from "./render-search-results";
import "./ui.css";

// Pexels API key

// Render the photos when first opened
renderInitialPhotos();

// Event listeners and callbacks
document.getElementById("photos").addEventListener("click", insert);
document
  .getElementById("search")
  .addEventListener("keyup", renderSearchResults);
