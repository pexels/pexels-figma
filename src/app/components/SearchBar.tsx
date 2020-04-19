import * as React from 'react';

const SearchBar = () => {
  const textbox = React.useRef<HTMLInputElement>(undefined);

  const searchRef = React.useCallback((element: HTMLInputElement) => {
    textbox.current = element;
  }, []);

  const onSearch = React.useCallback((event) => {
    // Prevent the form from submitting
    event.preventDefault();

    // Get the value of the search term
    const searchTerm = textbox.current.value;

    // If the search term isn't empty
    if (searchTerm !== '') {
      parent.postMessage({pluginMessage: {type: 'search', searchTerm}}, '*');
    }
  }, []);

  return (
    <form id="search-container" className="search" onSubmit={onSearch}>
      <div className="input-icon">
        <div className="input-icon__icon">
          <div className="icon icon--search icon--black-3" />
        </div>
        <input
          ref={searchRef}
          id="search"
          type="search"
          className="input-icon__input"
          placeholder="Type your search and hit return..."
        />
      </div>
    </form>
  );
};

export default SearchBar;
