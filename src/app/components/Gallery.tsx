import * as React from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import Photo from './Photo';
import SearchBar from './SearchBar';
import randomNumber from '../utils/random-number';

const Gallery = (props) => {
  // Absolute values
  const HEIGHT = 140;
  const WIDTH = 199;
  const PER_PAGE = 30;

  // Enpoints
  const searchEndpoint = 'https://api.pexels.com/v1/search';
  const curatedEndpoint = 'https://api.pexels.com/v1/curated';

  // States
  const [photos, setPhotos] = React.useState([]);
  const [pageNumber, setPageNumber] = React.useState(randomNumber);
  const [loading, setLoading] = React.useState(false);
  const [endpoint, setEndpoint] = React.useState(curatedEndpoint);
  const [searchTerm, setSearchTerm] = React.useState('');

  // Fetch data
  const fetchData = async () => {
    setLoading(true);

    return await axios
      .get(endpoint, {
        params: {
          query: searchTerm,
          per_page: PER_PAGE,
          page: pageNumber,
        },
        headers: {
          Authorization: process.env.API_KEY,
        },
      })
      .then((response) => {
        // setPhotos([...photos, ...response.data.photos]);
        setPhotos(response.data.photos);
        setLoading(false);
        setPageNumber(pageNumber + 1);
      })
      .catch(props.onError);
  };

  // Create the gallery of Photos
  const gallery = photos.map((photo) => {
    return (
      <Photo
        key={photo.id}
        photo={photo}
        onError={props.onError}
        onInsert={props.onInsert}
        height={HEIGHT}
        width={WIDTH}
      />
    );
  });

  const handleSearchSubmit = (term) => {
    setPhotos([]);
    setSearchTerm(term);
    setEndpoint(searchEndpoint);
  };

  // Fetch curated photos when the component is first rendered
  React.useEffect(() => {
    fetchData();
  }, []);

  // Fetch photos when the search state (searchTerm) is updated
  React.useEffect(() => {
    fetchData();
  }, [searchTerm]);

  // Show an initial group of fake images while the API request takes place
  return (
    <React.Fragment>
      <SearchBar onUserSubmit={handleSearchSubmit} />
      {loading && (
        <div className="skeleton">
          <Skeleton count={8} height={HEIGHT} />
        </div>
      )}
      <div id="gallery" className="gallery">
        {gallery}
      </div>
    </React.Fragment>
  );
};

export default Gallery;
