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

  // Define state for infinite scroll
  // const [infiniteSCroll] = React.useState({

  // })

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
    console.log(response);
    setImages(response.data.photos);
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

    // TODO: Abstract this into an error/success function and use it
    // for both this and search
    fetchData()
      .then(onSuccess)
      .catch(onError);
  }, []);

  // When the SearchBar for is submitted
  const onSearchSubmit = async (term) => {
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

  return (
    <React.Fragment>
      {message.content && <Notice content={message.content} isError={message.isError} isLoading={message.isLoading} />}
      <SearchBar userSubmit={onSearchSubmit} />
      {images.length ? <Gallery images={images} onError={onError} /> : <EmptyState searchTerm={searchTerm} />}
      <Footer />
    </React.Fragment>
  );
};

export default App;
