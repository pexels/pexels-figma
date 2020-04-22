import * as React from 'react';
import axios from 'axios';
import '../styles/ui.css';
import 'figma-plugin-ds/figma-plugin-ds.min.css';
import Footer from './Footer';
import SearchBar from './SearchBar';
import Gallery from './Gallery';
import EmptyState from './EmptyState';
import Notice from './Notice';

// Production API
let api = 'https://api.pexels.com/v1/';

// Development API
// if (process.env.NODE_ENV === 'development') {
//   api = 'http://localhost:3000/';
// }

const App = ({}) => {
  // Define the state for the image gallery
  const [images, setImages] = React.useState([]);

  // Set the state for when the page is loading
  const [pageIsLoading, setPageIsLoading] = React.useState(false);

  // Define the state for UI notices
  const [message, setMessage] = React.useState({
    content: '',
    isError: false,
    showSpinner: false,
  });

  // Define the srate for the search term
  const [searchTerm, setSearchTerm] = React.useState('');

  // Abstracted insertion function
  const handlePhotoInserted = ({content, isError, showSpinner}) => {
    setMessage({content, isError, showSpinner});
  };

  // Abstracted error function
  const handleError = (error) => {
    setMessage({content: `Error: ${error.response.data.error}`, isError: true, showSpinner: false});
  };

  // Abstracted success function
  const handleImagesFetched = (response) => {
    setPageIsLoading(true);
    setImages(response.data.photos);
  };

  // Abstracted function to fetch and show photos
  const showCurated = () => {
    setPageIsLoading(false);
    fetchData()
      .then(handleImagesFetched)
      .catch(handleError);
  };

  // Generate a random number
  // Used for random curated photos page
  const randomPage = (multiplier: number = 100) => {
    return Math.round(Math.random() * multiplier);
  };

  // Core fetch function querying Pexels APi
  // TODO: Abstract this to a utility function
  const fetchData = async () => {
    return await axios.get(`${api}curated`, {
      params: {
        per_page: 30,
        page: randomPage(),
      },
      headers: {
        Authorization: process.env.API_KEY,
      },
    });
  };

  // When the SearchBar for is submitted
  const onSearchSubmit = async (term) => {
    setPageIsLoading(true);

    // Remove existing images
    setImages([]);

    // Set the search term from the SearchBar to be used in App
    setSearchTerm(term);

    // Search the Pexels API
    // TODO: Use the fetch() function above
    await axios
      .get(`${api}search`, {
        params: {
          query: term,
          per_page: 30,
          page: 1,
        },
        headers: {
          Authorization: process.env.API_KEY,
        },
      })
      .then(handleImagesFetched)
      .catch(handleError);
  };

  // Equivalent to componentDidMount()
  React.useEffect(showCurated, []);

  // Determine what content to show
  const Content = () => {
    if (pageIsLoading === false && images.length) {
      // If the page isn't loading and there are no images retrived, show the empty state
      return <EmptyState searchTerm={searchTerm} onClick={showCurated} />;
    } else {
      // Otherwise show the image gallery
      return <Gallery images={images} onError={handleError} onInsert={handlePhotoInserted} />;
    }
  };

  return (
    <React.Fragment>
      {message.content && (
        <Notice content={message.content} isError={message.isError} showSpinner={message.showSpinner} />
      )}
      <SearchBar userSubmit={onSearchSubmit} />
      <Content />
      <Footer />
    </React.Fragment>
  );
};

export default App;
