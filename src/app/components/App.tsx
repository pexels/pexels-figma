import * as React from 'react';
import '../styles/ui.css';
import "figma-plugin-ds/figma-plugin-ds.min.css";

// declare function require(path: string): any;

const App = ({}) => {
  const textbox = React.useRef<HTMLInputElement>(undefined);
  
  const searchRef = React.useCallback((element: HTMLInputElement) => {
    // if (element && element.value != '')
    textbox.current = element;
  }, []);

  const onSearch = React.useCallback((event) => {
    event.preventDefault();
    const searchTerm = textbox.current.value;
    console.log(searchTerm);
    parent.postMessage({pluginMessage: {type: 'search', searchTerm}}, '*');
  }, []);

  React.useEffect(() => {

    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const {type, message} = event.data.pluginMessage;
      if (type === 'insert') {
        console.log(`Figma Says: ${message}`);
      }
    };
    
  }, []);

  return (
    <form onSubmit={onSearch}>
      <div id="notice" className="notice" />
      <div id="search-container" className="search">
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
      </div>

      <div id="photos" className="gallery" />

      <div className="footer">
        <p className="type type--pos-small-normal">
          Photos provided by
          <a title="Visit Pexels.com" target="_blank" href="https://pexels.com?ref=figma">
            Pexels
          </a>
          .
        </p>
      </div>
    </form>
  );
};

export default App;
