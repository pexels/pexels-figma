import * as React from 'react';
import '../styles/ui.css';
import 'figma-plugin-ds/figma-plugin-ds.min.css';
import Footer from './Footer';
import SearchBar from './SearchBar';
// import Gallery from './Gallery';
import Notice from './Notice';
import EmptyState from './EmptyState';

// declare function require(path: string): any;

const App = ({}) => {
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
    <React.Fragment>
      <Notice message="Loading&hellip;" loading={true} />
      <SearchBar />
      <EmptyState />
      {/* <Gallery /> */}
      <Footer />
    </React.Fragment>
  );
};

export default App;
