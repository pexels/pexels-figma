import renderSearchResults from "./render-search-results";

const controlActions = (event) => {
  // Get the next number from the button and make it a number
  const next = parseInt(document.getElementById(event.path[0].id).dataset.next);

  // Create a fake event to pass to the search result renderer
  const fakeReturnEvent = { keyCode: 13 };

  // If the next number is greater than the first page number
  if (next && next > 1) {
    renderSearchResults(fakeReturnEvent, next);
  }
};

export default controlActions;
