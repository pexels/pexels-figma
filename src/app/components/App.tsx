import * as React from 'react';
import axios from 'axios';
import '../styles/ui.css';
import 'figma-plugin-ds/figma-plugin-ds.min.css';
import Footer from './Footer';
import SearchBar from './SearchBar';
// import Gallery from './Gallery';
import Notice from './Notice';
import EmptyState from './EmptyState';

const App = ({}) => {
  const onSearchSubmit = (term) => {
    // Fetch
    axios.get('https://api.pexels.com/v1/search', {
      params: {
        query: term,
        per_page: 15,
        page: 1,
      },
      headers: {
        Authorization: process.env.API_KEY,
      },
    });
  };
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
