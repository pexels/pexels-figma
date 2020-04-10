import { render } from "../node_modules/lit-html/lit-html";
import renderSearchResults from "./render-search-results";

const controlActions = (event) => {
  // Get the next number from the button and make it a number
  const next = parseInt(document.getElementById(event.path[0].id).dataset.next);

  // Create a fake event to pass to the search result renderer
  const fakeReturnEvent = { keyCode: 13 };

  // Remove the next button when clicked
  render([], document.getElementById("notice"));

  // REnder new results
  renderSearchResults(fakeReturnEvent, next);
};

export default controlActions;
