import "figma-plugin-ds/figma-plugin-ds.min.css";
import insert from "./insert";
import renderInitialPhotos from "./render-initial-photos";
import renderSearchResults from "./render-search-results";
import controlActions from "./control-actions";
import "./ui.css";

// Render the photos when first opened
renderInitialPhotos(20);

// Event listeners and callbacks
document.getElementById("photos").addEventListener("click", insert);
document.getElementById("controls").addEventListener("click", controlActions);
document
  .getElementById("search")
  .addEventListener("keyup", renderSearchResults);
