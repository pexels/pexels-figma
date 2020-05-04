import * as React from 'react';

const SearchBar = (props) => {
  // Set the state to an empty string
  const [value, setValue] = React.useState('');
  const textInput = React.useRef(null);

  // Needs an change event handler or the input is readobnly
  const onInputChange = React.useCallback(
    (event) => {
      setValue(event.target.value);
    },
    [value],
  );

  // Apply focus to the currently referenced input
  const focus = () => {
    textInput.current.focus();
  };

  // Use useCallback to optimize child re-rendering
  // Need to pass the properties in the array at the end of the function
  // to only run when they change
  const onSearchSubmit = React.useCallback(
    (event) => {
      // Prevent the form from submitting
      event.preventDefault();

      // If the search term isn't empty
      // TODO: IF the value is the same as the previous submission
      if (value !== '') {
        // Send the value to the parent component
        props.onUserSubmit(value);
      }
    },
    [value],
  );

  // Focus the plugin when it first runs
  React.useEffect(() => focus(), []);

  return (
    <form id="search-container" className="search" onSubmit={onSearchSubmit}>
      <div className="input-icon">
        <div className="input-icon__icon">
          <div className="icon icon--search icon--black-3" />
        </div>
        <input
          id="search"
          ref={textInput}
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
