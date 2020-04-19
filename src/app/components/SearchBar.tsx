import * as React from 'react';

const SearchBar = () => {
  // Set the state to an empty string
  const [value, setValue] = React.useState('');

  const onInputChange = React.useCallback((event) => {
    setValue(event.target.value);
  }, []);

  const onSearchSubmit = React.useCallback(
    (event) => {
      // Prevent the form from submitting
      event.preventDefault();
      console.log(value);

      // If the search term isn't empty
      if (value !== '') {
        parent.postMessage({pluginMessage: {type: 'search', value}}, '*');
      }
    },
    [value],
  );

  return (
    <form id="search-container" className="search" onSubmit={onSearchSubmit}>
      <div className="input-icon">
        <div className="input-icon__icon">
          <div className="icon icon--search icon--black-3" />
        </div>
        <input
          // ref={searchRef}
          id="search"
          value={value}
          onChange={onInputChange}
          type="search"
          className="input-icon__input"
          placeholder="Type your search and hit return..."
        />
      </div>
    </form>
  );
};

export default SearchBar;
