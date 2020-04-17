import { render } from "../node_modules/lit-html/lit-html";
import renderSearchResults from "./render-search-results";

const controlActions = (event) => {
  // Get the next number from the button and make it a number
  const nextPageNumber = parseInt(
    document.getElementById(event.path[0].id).dataset.next
  );

  // Remove the next button when clicked
  render([], document.getElementById("notice"));

  // REnder new results
  renderSearchResults(nextPageNumber);
};

export default controlActions;
