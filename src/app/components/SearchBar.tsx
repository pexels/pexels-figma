import * as React from 'react';

const SearchBar = (props) => {
  // Set the state to an empty string
  const [value, setValue] = React.useState('');

  // Needs an change event handler or the input is readobnly
  const onInputChange = React.useCallback((event) => {
    setValue(event.target.value);
  }, []);

  // Use useCallback to optimize child re-rendering
  // Need to pass the properties in the array at the end of the function
  const onSearchSubmit = React.useCallback(
    (event) => {
      // Prevent the form from submitting
      event.preventDefault();

      // If the search term isn't empty
      if (value !== '') {
        // Send the value to the parent component
        props.userSubmit(value);

        // Sendthe value to Figma
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
