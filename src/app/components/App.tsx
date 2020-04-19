import * as React from 'react';
import axios from 'axios';
import '../styles/ui.css';
import 'figma-plugin-ds/figma-plugin-ds.min.css';
import Footer from './Footer';
import SearchBar from './SearchBar';
import Gallery from './Gallery';
import EmptyState from './EmptyState';
// import Notice from './Notice';

const App = ({}) => {
  // Define the state for the image gallery
  const [images, setImages] = React.useState([]);

  // DEfine the srate for the search term
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

    // Set the API response data to the image state
    setImages(response.data.photos);

    // Set the search term from the SearchBar to be used in App
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
      {/* <Notice message="Loading&hellip;" loading={true} /> */}
      <SearchBar userSubmit={onSearchSubmit} />
      {images.length ? <Gallery images={images} /> : <EmptyState searchTerm={searchTerm} />}
      <Footer />
    </React.Fragment>
  );
};

export default App;
