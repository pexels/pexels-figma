import * as React from 'react';
import axios from 'axios';
import '../styles/ui.css';
import 'figma-plugin-ds/figma-plugin-ds.min.css';
import Footer from './Footer';
import SearchBar from './SearchBar';
// import Gallery from './Gallery';
import Notice from './Notice';
// import EmptyState from './EmptyState';

const App = ({}) => {
  const [images, setImages] = React.useState({total_results: 0});
  const [searchTerm, setSearchTerm] = React.useState('');
  // When the SearchBar for is submitted
  const onSearchSubmit = async (term) => {
    // Search the Pexels API
    const response = await axios.get('https://api.pexels.com/v1/search', {
      params: {
        query: term,
        per_page: 30,
        page: 1,
      },
      headers: {
        Authorization: process.env.API_KEY,
      },
    });

    setImages(response.data);
    setSearchTerm(term);
  };

  // React.useEffect(() => {
  //   // This is how we read messages sent from the plugin controller
  //   window.onmessage = (event) => {
  //     const {type, message} = event.data.pluginMessage;
  //     if (type === 'insert') {
  //       console.log(`Figma Says: ${message}`);
  //     }
  //   };
  // }, []);

  return (
    <React.Fragment>
      <Notice message="Loading&hellip;" loading={true} />
      <SearchBar userSubmit={onSearchSubmit} />
      <span>
        Found: {images.total_results} images for {searchTerm}.
      </span>
      {/* <EmptyState /> */}
      {/* <Gallery /> */}
      <Footer />
    </React.Fragment>
  );
};

export default App;
