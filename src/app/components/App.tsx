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

  // Define state for infinite scroll
  // const [infiniteScroll, setInfiniteScroll] = React.useState({

  // })

  // Set the state for page loading
  const [loading, setLoading] = React.useState(false);

  // Define the state for error & loading messages
  const [message, setMessage] = React.useState({
    content: '',
    isError: false,
    isLoading: false,
  });

  // Define the srate for the search term
  const [searchTerm, setSearchTerm] = React.useState('');

  const onError = (error) => {
    setMessage({content: `Error: ${error.response.data.error}`, isError: true, isLoading: false});
  };

  const onSuccess = (response) => {
    setImages(response.data.photos);
    setLoading(true);
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
    setLoading(false);
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
    // IF the loading state is false
    if (loading === false) {
      return <LoadingState />;
    } else if (!images.length) {
      return <EmptyState searchTerm={searchTerm} />;
    } else {
      return <Gallery images={images} onError={onError} />;
    }
  };

  return (
    <React.Fragment>
      {message.content && <Notice content={message.content} isError={message.isError} isLoading={message.isLoading} />}
      <SearchBar userSubmit={onSearchSubmit} />
      <Content />
      <Footer />
    </React.Fragment>
  );
};

export default App;
