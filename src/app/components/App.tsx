import * as React from 'react';
import axios from 'axios';
import '../styles/ui.css';
import 'figma-plugin-ds/figma-plugin-ds.min.css';
import Footer from './Footer';
import SearchBar from './SearchBar';
import Gallery from './Gallery';
import EmptyState from './EmptyState';
import LoadingState from './LoadingState';
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

  // Set the state for page isLoading
  const [isLoading, setIsLoading] = React.useState(false);

  // Define the state for error & isLoading messages
  const [message, setMessage] = React.useState({
    content: '',
    isError: false,
    showSpinner: false,
  });

  // Define the srate for the search term
  const [searchTerm, setSearchTerm] = React.useState('');

  // Abstracted insertion function
  const onInsert = ({content, isError, showSpinner}) => {
    setMessage({content, isError, showSpinner});
  };

  // Abstracted error function
  const onError = (error) => {
    setMessage({content: `Error: ${error.response.data.error}`, isError: true, showSpinner: false});
  };

  // Abstracted success function
  const onSuccess = (response) => {
    setImages(response.data.photos);
    setIsLoading(true);
  };

  const randomPage = (multiplier: number = 100) => {
    return Math.round(Math.random() * multiplier);
  };

  // Render curated photos when the component is initiated
  // TODO: Try and abstract this to its own function and use it
  // for both curated and search
  React.useEffect(() => {
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

    fetchData()
      .then(onSuccess)
      .catch(onError);
  }, []);

  // When the SearchBar for is submitted
  const onSearchSubmit = async (term) => {
    setIsLoading(false);
    // Search the Pexels API
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
      .then(onSuccess)
      .catch(onError);

    // Set the search term from the SearchBar to be used in App
    setSearchTerm(term);
  };

  // Determine what content to show
  const Content = () => {
    // If the isLoading state is false
    if (isLoading === false) {
      return <LoadingState />;

      // If there are no images
    } else if (!images.length) {
      return <EmptyState searchTerm={searchTerm} />;

      // Otherwise show the image gallery
    } else {
      return <Gallery images={images} onError={onError} onInsert={onInsert} />;
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
